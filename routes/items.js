const express = require('express');
const { getAllItems, createItem, updateItem, deleteItem } = require('../controllers/items');
const router = express.Router();

router
  .route('/')
  .get(getAllItems)

router
  .route('/')
  .post(createItem)

router
  .route('/:id')
  .put(updateItem)

router
  .route('/:id')
  .delete(deleteItem)

module.exports = router;

