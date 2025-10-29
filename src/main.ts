import express from 'express';
import { connectMongo } from './lib/shared/infrastructure/mongoConnection';
import { ExpressLibroRouter } from './lib/libro/infrastructure/ExpressLibroRouter';
import {  ExpressAutorRouter } from './lib/autor/infrastructure/ExpressAutorRouter';
import {ExpressEstudianteRouter }from './lib/estudiante/infrastructure/ExpressEstudianteRouter';
import { ExpressRegistroRouter} from './lib/registro/infrastructure/ExpressRegistroRouter';


const app = express();
app.use(express.json());

const PORT = 3000;
app.use("/api/libro", ExpressLibroRouter);
app.use("/api/autor", ExpressAutorRouter);
app.use("/api/estudiante", ExpressEstudianteRouter);
app.use("/api/registro", ExpressRegistroRouter);


app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});


const startServer = async () => {
  await connectMongo(); // conexión antes de iniciar el servidor
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
};

startServer();


