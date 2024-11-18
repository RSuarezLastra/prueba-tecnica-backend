const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator} = require('../helpers/fieldValidator');
const { createUser, loginUser } = require('../controllers/auth');

const router = Router();

router.post('/register',
  [
    check('name', 'El nombre debe tener al menos 2 caracteres').isLength({ min: 2 }),
    check('userName', 'El userName es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email valido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    fieldValidator
  ],
  createUser
);

router.post('/login',
  [
    check('email', 'Ingrese un email valido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').not().isEmpty(),
    fieldValidator
  ],
  loginUser
)

module.exports = router;