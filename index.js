const express = require('express');
const { dbConnection } = require('./database/config');
const authRouter  = require('./routes/auth');
require('dotenv').config();

const { PORT } = process.env;

const app = express();

// Conexion a base de datos
dbConnection();

//Rutas
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})