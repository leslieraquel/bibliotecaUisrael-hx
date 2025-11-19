import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/pdfs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const uploadPDF = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Solo se permiten PDFs"));
    } else {
      cb(null, true);
    }
  }
});