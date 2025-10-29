import { Router } from "express";
import { ExpressRegistroController } from "./ExpressRegistroController";

const controller = new ExpressRegistroController();
const ExpressRegistroRouter = Router();

ExpressRegistroRouter.post("/save/", controller.create);
ExpressRegistroRouter.get("/list/", controller.getAll);
ExpressRegistroRouter.put("/update/", controller.edit);
ExpressRegistroRouter.delete("/delete/:id", controller.delete); 
ExpressRegistroRouter.get("/findById/:id/", controller.getOneById);


export { ExpressRegistroRouter };


