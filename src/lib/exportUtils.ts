export function exportToWord(htmlContent: string, filename: string = "document") {
  const sourceHTML =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>" +
    htmlContent +
    "</body></html>";

  const blob = new Blob(["\ufeff", sourceHTML], { type: "application/msword" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
