import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";
import { ExpressAuthController } from "./ExpressAuthController";

import { OpenAIRecomendacionAdapter } from "../../shared/infrastructure/adapters/openai-recomendacion.adapter";

// Repositorios
import { InMemoryLibroRepository } from "../../libro/infrastructure/InMemoryLibroRepository";
import { InMemoryRegistroRepository } from "../../registro/infrastructure/InMemoryRegistroRepository";


const libroRepo = new InMemoryLibroRepository();
const registroRepo = new InMemoryRegistroRepository();
const controller = new ExpressUserController();
const ExpressUserRouter = Router();
const recomendacionService = new OpenAIRecomendacionAdapter(
    libroRepo,
    registroRepo
);

ExpressUserRouter.post("/save", controller.create);
ExpressUserRouter.get("/list", controller.getAll);
ExpressUserRouter.put("/update/:ci", controller.edit);
ExpressUserRouter.delete("/delete/:ci", controller.delete); 
ExpressUserRouter.get("/findById/:ci", controller.getOneById);

ExpressUserRouter.get('/check-ci/:ci', controller.checkCi);ExpressUserRouter.get('/check-name/:name', controller.checkName);
const authController = new ExpressAuthController();
const ExpressAuthRouter = Router();

ExpressAuthRouter.post("/login", authController.login);
ExpressAuthRouter.post("/logout", authController.logout);
ExpressAuthRouter.get("/verify", authController.verifyToken); 

ExpressAuthRouter.get("/recomendaciones/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params;
    const recomendaciones = await recomendacionService.obtenerRecomendacionesPorUsuario(idUsuario);
    res.json(recomendaciones.map(l => l.mapToPrimitives()));
});

export { ExpressUserRouter, ExpressAuthRouter };
