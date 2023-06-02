const { convertPDFtoIMG } = require("./index.js");


const conv = async () => {
    const pdf = await convertPDFtoIMG({
        pge: 12,
        pdfPath: "https://www.kotobati.com/book/download/85d174a6-942f-40fe-953d-e04f4be35d65",
        scale: 5, 
        // png: true, optional - default value true (if false will convert to Jpeg)
      })
      console.log(pdf)
}
conv();