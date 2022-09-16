const categoryService = require('../services/categoryService');

const getAll = async (req, res) => {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
  };

const create = async (req, res) => {
  const { name } = req.body;
  const createdCategory = await categoryService.create(name);
  return res.status(201).json(createdCategory);
};

module.exports = {
  create,
  getAll,
}; 