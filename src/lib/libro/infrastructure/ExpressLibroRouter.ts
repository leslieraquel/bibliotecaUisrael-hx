import { Router } from "express";
import multer from "multer";
import { uploadPDF } from "./multerConfig";
import { ExpressLibroController } from "./ExpressLibroController";

const controller = new ExpressLibroController();
const storage = multer.diskStorage({
    destination: "uploads/pdfs",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
    });
const upload = multer({ storage });
const ExpressLibroRouter = Router();
// ExpressLibroRouter.post("/save", controller.create);
ExpressLibroRouter.get("/list", controller.getAll);
ExpressLibroRouter.put("/update", controller.edit);
ExpressLibroRouter.delete("/delete/:id", controller.delete); 
// ExpressLibroRouter.get("/findById/:id", controller.getOneById);
ExpressLibroRouter.post(
  "/libros",
  upload.single("archivo"), // ← este es el campo del form
  (req, res, next) => controller.create(req, res, next)
);

export { ExpressLibroRouter };
import { LibroModel } from './modelLibro'; 

const router = Router();
