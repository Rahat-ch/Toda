const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [240, 'Description cannot be more that 240 chracters'],
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
  current: {
    type: Boolean,
    default: true,
    required: true,
  },
  segment: {
    type: String,
    enum: ['daily', 'weekly'],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);