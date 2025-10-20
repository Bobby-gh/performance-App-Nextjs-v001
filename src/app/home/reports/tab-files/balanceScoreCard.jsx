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
  const chartsRef = useRef(null); 

  const exportChartsAsPDF = async () => {
    if (chartsRef.current) {
      const canvas = await html2canvas(chartsRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false 
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Convert canvas to JPEG image data
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.save("balanced-scorecard-charts.pdf");
    }
  };

  return (
    <div className="mt-8 mx-8">
      <button 
        onClick={exportChartsAsPDF} 
        className="p-2 text-white rounded hover:bg-blue-600 mb-4"
      >
        Export Charts to PDF
      </button>

      <div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4" 
        ref={chartsRef} 
      > 
        <FinancialGoal />
        <HumanResourceGoal />
        <CustomerCentricGoal />
        <InternalProcessandInnovation/>
      </div>

      <div className="mt-8 card bg-white rounded-lg">
        <GoalTable/> {/* This will be excluded from the PDF */}
      </div>
    </div>
  );
}