const { Schema, model } = require('mongoose');

const TaskSchema = Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'en curso', 'completada'],
    default: 'pendiente'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = model('Task', TaskSchema); 