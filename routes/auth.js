const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator} = require('../helpers/fieldValidator');
const { createUser } = require('../controllers/auth');

const router = Router();

router.post('/',
  [
    check('name', 'El nombre debe tener al menos 2 caracteres').isLength({ min: 2 }),
    check('email', 'Ingrese un email valido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    fieldValidator
  ],
  createUser
);



module.exports = router;