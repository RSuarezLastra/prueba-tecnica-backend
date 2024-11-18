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

app.use(cors());

app.use(express.json());


//Rutas
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter)



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})