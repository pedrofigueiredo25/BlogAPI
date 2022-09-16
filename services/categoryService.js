const { Category } = require('../database/models');
const errorMessage = require('../utils/errorMessage');

const getById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  if (!category) throw errorMessage(400, '"categoryIds" not found');
  return category;
};

const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
  };

const create = async (name) => {
  const createdCategory = await Category.create({ name });
  return createdCategory;
};

module.exports = {
  create,
  getAll,
  getById,
}; 