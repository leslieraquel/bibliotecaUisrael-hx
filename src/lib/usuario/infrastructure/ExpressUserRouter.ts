import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";
import { ExpressAuthController } from "./ExpressAuthController";

const controller = new ExpressUserController();
const ExpressUserRouter = Router();

ExpressUserRouter.post("/save", controller.create);
ExpressUserRouter.get("/list", controller.getAll);
ExpressUserRouter.put("/update/:ci", controller.edit);
ExpressUserRouter.delete("/delete/:ci", controller.delete); 
ExpressUserRouter.get("/findById/:ci", controller.getOneById);

const authController = new ExpressAuthController();
const ExpressAuthRouter = Router();

ExpressAuthRouter.post("/login", authController.login);
ExpressAuthRouter.post("/logout", authController.logout);
ExpressAuthRouter.get("/verify", authController.verifyToken); 

export { ExpressUserRouter, ExpressAuthRouter };
