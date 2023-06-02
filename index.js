const canvas = require("canvas");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const request = require('request');

function getPdfData(pdfUrl) {
  return new Promise((resolve, reject) => {
    request.get({ url: pdfUrl, encoding: null }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

async function convertPDFtoIMG({ pge, pdfPath, scale = 1.5, png = true }) {
  if (!pdfPath) {
    throw new Error("pdfPath must be provided");
  }
  const pdfData = await getPdfData(pdfPath);
  const loadingTask = pdfjs.getDocument(pdfData);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(pge);
  const numPages = await pdf.numPages;
  const viewport = page.getViewport({ scale });
  const cnv = canvas.createCanvas(viewport.width, viewport.height);
  const ctx = cnv.getContext("2d");
  cnv.height = viewport.height;
  cnv.width = viewport.width;
  await page.render({ canvasContext: ctx, viewport });

  await new Promise((resolve) => setTimeout(resolve, 100));

  const buffer = cnv.toBuffer(png ? "image/png" : "image/jpeg");
  const b64 = buffer.toString("base64");

  return { pages : numPages, base64Image: b64 };
}

module.exports = { convertPDFtoIMG };
