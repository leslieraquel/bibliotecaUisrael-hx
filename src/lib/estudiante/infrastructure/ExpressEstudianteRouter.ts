import { Router } from "express";
import { ExpressEstudianteController } from "./ExpressEstudianteController";

const controller = new ExpressEstudianteController();
const ExpressEstudianteRouter = Router();
ExpressEstudianteRouter.post("/save/", controller.create);
ExpressEstudianteRouter.get("/list", controller.getAll);
ExpressEstudianteRouter.put("/update/:id", controller.edit);
ExpressEstudianteRouter.delete("/delete/:id", controller.delete); 
ExpressEstudianteRouter.get("/findById/:id/", controller.getOneById);

export { ExpressEstudianteRouter };