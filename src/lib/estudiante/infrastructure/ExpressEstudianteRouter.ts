import { Router } from "express";
import { ExpressEstudianteController } from "./ExpressEstudianteController";

const controller = new ExpressEstudianteController();
const ExpressEstudianteRouter = Router();
ExpressEstudianteRouter.post("/estudiantes/", controller.create);
ExpressEstudianteRouter.put("/estudiantes/", controller.edit);
ExpressEstudianteRouter.delete("/estudiantes/", controller.delete);
ExpressEstudianteRouter.delete("/estudiantes/:id", controller.delete); 
ExpressEstudianteRouter.get("/estudiantes/:id/", controller.getOneById);

export { ExpressEstudianteRouter };