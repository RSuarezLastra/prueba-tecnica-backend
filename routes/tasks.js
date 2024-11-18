const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator} = require('../helpers/fieldValidator');
const { newTask} = require('../controllers/tasks');

const router = Router();

router.post('/new',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    fieldValidator
  ],
  newTask
);


module.exports = router;

