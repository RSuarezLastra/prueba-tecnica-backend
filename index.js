const express = require('express');
const {dbConnection} = require('./database/config');
require('dotenv').config();

const { PORT } = process.env;

const app = express();

dbConnection();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})