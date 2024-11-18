const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

  const { name, userName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Usuario con este email'
      });
    }

    user = new User({ name, userName, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: 'Usuario registrado exitosamente',
      uid: user.id,
      name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json('Error al crear usuario');
  }
}

const loginUser = async (req, res = response) => {
  try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con este email'
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      ms: 'usuario loggeado correctamente',
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json('Error al crear usuario');
  }

}

module.exports = {
  createUser,
  loginUser
}