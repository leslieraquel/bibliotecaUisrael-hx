import { Router } from "express";
import { ExpressLibroController } from "./ExpressLibroController";

const controller = new ExpressLibroController();
const ExpressLibroRouter = Router();
ExpressLibroRouter.post("/save/", controller.create);
ExpressLibroRouter.get("/list", controller.getAll);
ExpressLibroRouter.put("/update/", controller.edit);
ExpressLibroRouter.delete("/delete/:id", controller.delete); 
ExpressLibroRouter.get("/findById/:id/", controller.getOneById);

export { ExpressLibroRouter };