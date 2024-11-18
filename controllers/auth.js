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

module.exports = {
  createUser,
}