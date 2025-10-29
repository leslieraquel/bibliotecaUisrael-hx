import { Router } from "express";
import { ExpressAutorController } from "./ExpressAutorController";

const controller = new ExpressAutorController();
const ExpressAutorRouter = Router();
ExpressAutorRouter.post("/save", controller.create);
ExpressAutorRouter.get("/list", controller.getAll);

ExpressAutorRouter.put("/update", controller.edit);
ExpressAutorRouter.delete("/delete/:id", controller.delete); 
ExpressAutorRouter.get("/findById/:id", controller.getOneById);

export { ExpressAutorRouter };