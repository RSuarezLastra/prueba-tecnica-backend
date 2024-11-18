const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../helpers/fieldValidator');
const { newTask, getAllTasks, updateTask, deleteTask } = require('../controllers/tasks');
const { validateJwt } = require('../middlewares/jwt-validate');

const router = Router();

router.use(validateJwt);

router.get('/', getAllTasks);

router.post('/new',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    fieldValidator
  ],
  newTask
);

router.put('/update/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    fieldValidator
  ],
  updateTask
)

router.delete('/delete/:id', deleteTask);


module.exports = router;

