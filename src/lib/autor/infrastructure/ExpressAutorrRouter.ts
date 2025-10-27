import { Router } from "express";
import { ExpressAutorController } from "./ExpressAutorController";

const controller = new ExpressAutorController();
const ExpressAutorRouter = Router();
ExpressAutorRouter.post("/autores/", controller.create);
ExpressAutorRouter.put("/autores/", controller.edit);
ExpressAutorRouter.delete("/autores/", controller.delete);
ExpressAutorRouter.delete("/autores/:id", controller.delete); 
ExpressAutorRouter.get("/autores/:id/", controller.getOneById);

export { ExpressAutorRouter };