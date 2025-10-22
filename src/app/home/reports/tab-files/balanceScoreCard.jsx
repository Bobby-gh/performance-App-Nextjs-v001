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
import { Building2} from 'lucide-react';

export default function BalanceScoreCard() {
  // 1. Create a ref to target the chart container
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
      
      // 5. Save the PDF file
      pdf.save("balanced-scorecard-charts.pdf");
    }
  };

  return (
    <div className="mt-8 mx-8">
      <button 
        onClick={exportChartsAsPDF} 
        className="p-2 text-blue rounded mb-4"
      >
        Export Charts to PDF
      </button>
      <div ref={chartsRef} >
        <div className="space-y-4">
        <h1 className="text-6xl font-bold text-gray-900 print:text-5xl items-center mb-8">
          {'General Report (Balanced Scorecard)'}
        </h1>
        </div>
        <div 
        className="grid grid-cols-2 lg:grid-cols-2 gap-4 items-center" 
      > 
        <FinancialGoal />
        <HumanResourceGoal />
        <CustomerCentricGoal />
        <InternalProcessandInnovation/>
      </div>
      </div>
      

      <div className="mt-8 card bg-white rounded-lg">
        <GoalTable/> 
      </div>
    </div>
  );
}