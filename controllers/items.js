const Item = require('../models/Item');

// @desc   Get all items
//@route   GET /api/v1/items
exports.getAllItems = async (req, res, next) => {
  try {
    const item = await Item.find();
    res.status(200).json({
      success: true,
      data: item,
    })
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

//@desc Create new Item
//@route POST /api/v1/items
exports.createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Update Item
//@route PUT /api/v1/items/:id
exports.updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: item });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
}

//@desc Delete Item
//@route DELETE /api/v1/items/:id
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
}