const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const authRouter  = require('./routes/auth');
const tasksRouter  = require('./routes/tasks');

const { PORT } = process.env;


const app = express();

// Conexion a base de datos
dbConnection();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json());


//Rutas
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter)



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})