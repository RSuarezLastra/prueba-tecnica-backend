const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../helpers/fieldValidator');
const { newTask } = require('../controllers/tasks');
const { validateJwt } = require('../middlewares/jwt-validate');

const router = Router();

router.use(validateJwt);

router.post('/new',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    fieldValidator
  ],
  newTask
);


module.exports = router;

