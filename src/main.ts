import express from 'express';
import { connectMongo } from './lib/shared/infrastructure/mongoConnection';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const startServer = async () => {
  await connectMongo(); // conexión antes de iniciar el servidor
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
};

startServer();
