import { Router } from "express";
import { ExpressLibroController } from "./ExpressLibroController";

const controller = new ExpressLibroController();
const ExpressLibroRouter = Router();
ExpressLibroRouter.post("/libros/", controller.create);
ExpressLibroRouter.put("/libros/", controller.edit);
ExpressLibroRouter.delete("/libros/", controller.delete);
ExpressLibroRouter.delete("/libros/:id", controller.delete); 
ExpressLibroRouter.get("/libros/:id/", controller.getOneById);

export { ExpressLibroRouter };