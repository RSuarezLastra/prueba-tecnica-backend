const { response } = require('express');
const Task = require('../models/Task');

const newTask = async (req, res = response) => {

  const { title, description } = req.body;

  const task = new Task({ title, description });

  try {

    task.user = req.uid;

    const savedTask = await task.save();

    return res.status(201).json({
      ok: true,
      msg: 'Tarea creada exitosamente',
      task: savedTask
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear tarea'
    });
  }
}

module.exports = {
  newTask,
}