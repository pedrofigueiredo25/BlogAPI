const { PostCategory } = require('../database/models');

const create = (postId, categoryId) => {
  const createdPostCategory = PostCategory.create({ postId, categoryId });
  return createdPostCategory;
}; 

const remove = async (id) => {
    const rmvPostCategory = await PostCategory.destroy({ 
      where: { postId: id },
    });
    return rmvPostCategory;
  };

module.exports = {
  create,
  remove,
}; 