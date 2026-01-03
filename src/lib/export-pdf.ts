import jsPDF from "jspdf";

export function exportPDF(summary: any) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("FlowForge Analytics Report", 20, 20);

  doc.setFontSize(12);
  let y = 40;

  Object.entries(summary).forEach(([k, v]) => {
    doc.text(`${k}: ${v}`, 20, y);
    y += 10;
  });

  doc.save("flowforge-analytics.pdf");
}
