import React, { useRef } from "react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  CustomerCentricGoal,
  FinancialGoal,
  HumanResourceGoal,
  InternalProcessandInnovation,
} from "@/app/components/charts";
import { GoalTable } from "@/app/components/tables";

export default function BalanceScoreCard() {
  // Create refs for each individual chart component
  const financialGoalRef = useRef(null);
  const hrGoalRef = useRef(null);
  const customerGoalRef = useRef(null);
  const internalProcessGoalRef = useRef(null);

  const exportChartsAsPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4'); 
    const margin = 10; 
    const availableWidth = doc.internal.pageSize.getWidth() - (2 * margin);

    const chartRefs = [
      { ref: financialGoalRef, title: "Financial Goal" },
      { ref: hrGoalRef, title: "Human Resource Goal" },
      { ref: customerGoalRef, title: "Customer Centric Goal" },
      { ref: internalProcessGoalRef, title: "Internal Process & Innovation" },
    ];

    for (const { ref, title } of chartRefs) {
      if (ref.current) {
        const canvas = await html2canvas(ref.current, { 
          scale: 3, 
          useCORS: true,
          logging: false 
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const imgProps = doc.getImageProperties(imgData);

        let imgHeight = (imgProps.height * availableWidth) / imgProps.width;
        let imgWidth = availableWidth; 

        if (yOffset + imgHeight + margin > doc.internal.pageSize.getHeight()) {
          doc.addPage();
          yOffset = margin; 
        }
        
        // Add chart title (optional)
        doc.setFontSize(16);
        doc.text(title, margin, yOffset);
        yOffset += 8; 

        doc.addImage(imgData, 'JPEG', margin, yOffset, imgWidth, imgHeight);
        
        yOffset += imgHeight + margin; 
      }
    }

    doc.save("balanced-scorecard-charts.pdf");
  };

  return (
    <div className="mt-8 mx-8">
      <button 
        onClick={exportChartsAsPDF} 
        className="p-2 text-blue rounded hover:bg-blue-600 mb-4"
      >
        Export Charts to PDF
      </button>

      {/* Apply individual refs to each chart's outer div */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"> 
        <div ref={financialGoalRef}><FinancialGoal /></div>
        <div ref={hrGoalRef}><HumanResourceGoal /></div>
        <div ref={customerGoalRef}><CustomerCentricGoal /></div>
        <div ref={internalProcessGoalRef}><InternalProcessandInnovation/></div>
      </div>

      <div className="mt-8 card bg-white rounded-lg">
        <GoalTable/> 
      </div>
    </div>
  );
}