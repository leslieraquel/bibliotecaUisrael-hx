import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";

const controller = new ExpressUserController();
const ExpressUserRouter = Router();

ExpressUserRouter.post("/save/", controller.create);
ExpressUserRouter.get("/list", controller.getAll);
ExpressUserRouter.put("/update/:ci", controller.edit);
ExpressUserRouter.delete("/delete/:ci", controller.delete); 
ExpressUserRouter.get("/findById/:ci/", controller.getOneById);

export { ExpressUserRouter };