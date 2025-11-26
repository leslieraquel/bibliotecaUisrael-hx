import express from 'express';
import cors from 'cors';
import { connectMongo } from './lib/shared/infrastructure/mongoConnection';
import { ExpressLibroRouter } from './lib/libro/infrastructure/ExpressLibroRouter';
import { ExpressAutorRouter } from './lib/autor/infrastructure/ExpressAutorRouter';
import {ExpressEstudianteRouter }from './lib/estudiante/infrastructure/ExpressEstudianteRouter';
import { ExpressRegistroRouter} from './lib/registro/infrastructure/ExpressRegistroRouter';
import { ExpressAuthRouter } from './lib/usuario/infrastructure/ExpressUserRouter';
import { ExpressUserRouter } from './lib/usuario/infrastructure/ExpressUserRouter';


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4200', // Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);


const PORT = 3000;
app.use("/api/libro", ExpressLibroRouter);
app.use("/api/autor", ExpressAutorRouter);
app.use("/api/estudiante", ExpressEstudianteRouter);
app.use("/api/registro", ExpressRegistroRouter);
app.use("/api/users", ExpressUserRouter);
app.use("/api/auth", ExpressAuthRouter);




app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});


const startServer = async () => {
  await connectMongo(); // conexión antes de iniciar el servidor
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
};

startServer();


