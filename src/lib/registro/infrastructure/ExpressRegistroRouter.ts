import { Router } from "express";
import { ExpressRegistroController } from "./ExpressRegistroController";

const controller = new ExpressRegistroController();
const ExpressRegistroRouter = Router();

ExpressRegistroRouter.post("/registros/", controller.create);
ExpressRegistroRouter.put("/registros/", controller.edit);
ExpressRegistroRouter.delete("/registros/", controller.delete);
ExpressRegistroRouter.delete("/registros/:id", controller.delete); 
ExpressRegistroRouter.get("/registros/:id/", controller.getOneById);

export { ExpressRegistroRouter };