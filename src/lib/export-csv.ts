export function exportCSV(data: any[], filename = "analytics.csv") {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row).join(",")
  );

  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
