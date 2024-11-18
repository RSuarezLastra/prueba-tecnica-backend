const { response } = require('express');
const Task = require('../models/Task');
const User = require('../models/User');

const getAllTasks = async (req, res = response) => {

  const user = req.uid;

  const tasks = await Task.find({ user });
  const userFound = await User.findById(user);

  if (tasks == 0) {
    return res.status(203).json({
      ok: false,
      msg: 'No hay tareas creadas'
    })
  }

  return res.status(200).json({
    ok: true,
    msg: `tareas del usuario ${userFound.name}`,
    tasks
  });
}

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

const updateTask = async (req, res = response) => {

  const taskId = req.params.id;

  try {

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una tarea con ese id'
      })
    }

    if (task.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este tarea'
      })
    }

    const newTask = {
      ...req.body,
      user: req.uid
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, newTask, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Tarea actualizada',
      task: updatedTask
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'Error al actualizar tarea',
    });
  }
}

const deleteTask = async (req, res = response) => {

  const taskId = req.params.id;

  try {

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una tarea con ese id'
      })
    }

    if (task.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este tarea'
      })
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      ok: true,
      msg: 'Tarea Eliminada'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'Error al eliminar tarea',
    });
  }
}

module.exports = {
  newTask,
  getAllTasks,
  updateTask,
  deleteTask
}