const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Item = require('../models/Item');

// @desc   Get all items
//@route   GET /api/v1/items
exports.getAllItems = asyncHandler(async (req, res, next) => {
  const item = await Item.find(req.query);
  res.status(200).json({
    success: true,
    data: item,
  })
  res.status(400).json({ success: false });
});


//@desc Create new Item
//@route POST /api/v1/items
exports.createItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);
  res.status(201).json({
    success: true,
    data: item
  });
});

//@desc Update Item
//@route PUT /api/v1/items/:id
exports.updateItem = asyncHandler(async (req, res, next) => {

  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return next(
      new ErrorResponse(`Item not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: item });
})

//@desc Delete Item
//@route DELETE /api/v1/items/:id
exports.deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id)
  if (!item) {
    return next(
      new ErrorResponse(`Item not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
})