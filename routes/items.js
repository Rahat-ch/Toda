const express = require('express');
const { getAllItems, createItem, updateItem, deleteItem } = require('../controllers/items');
const router = express.Router();
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getAllItems)

router
  .route('/')
  .post(protect, createItem)

router
  .route('/:id')
  .put(protect, updateItem)

router
  .route('/:id')
  .delete(protect, deleteItem)

module.exports = router;

