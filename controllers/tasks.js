const { response } = require('express');

const newTask = async (req, res = response) => {
  try {

    const { title, description } = req.body;
    

  } catch (error) {
    console.log(error);
    res.status(500).json('Error al crear tarea');
  }
}

module.exports = {
  newTask,
}