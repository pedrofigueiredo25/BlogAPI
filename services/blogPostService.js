const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../database/models');
const errorMessage = require('../utils/errorMessage');
const userService = require('./userService');
const postCategoriesService = require('./postCategoriesService');

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) throw errorMessage(404, 'Post does not exist');

return post;
};

const create = async (newPost, user) => {
  if (!user) throw errorMessage(404, 'User not found');
  const createdPost = await BlogPost.create({ ...newPost, userId: user.id });
  return createdPost.dataValues;
};

const findPost = async ({ data: { email } }, { userId }) => {
  const { id } = await userService.getUserByEmail(email);
    if (!id || id !== userId) {
      throw errorMessage(401, 'Unauthorized user');
    }  
  };
  
  const checkPost = async (id) => {
    const postFounded = await BlogPost.findOne({ where: { id } });
    if (!postFounded) throw errorMessage(404, 'Post does not exist');
    return postFounded;
  };
  
  const removePost = async (id, user) => {
    const postFounded = await checkPost(id);
    await findPost(user, postFounded);
    await postCategoriesService.remove(id);
    await BlogPost.destroy({ where: { id } });
  };
  
  const removeById = async (userId) => {
    await BlogPost.destroy({ where: { userId } });
  };

  const byTerm = async (term) => {
    const postsFounded = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${term}%` } },
          { content: { [Op.like]: `%${term}%` } },
        ] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return postsFounded.length ? postsFounded : [];
  };

  const update = async (user, { id }, { title, content }) => {
    const postFounded = await checkPost(id);
    await findPost(user, postFounded);
    await BlogPost.update(
      { title, content },
      { where: { id } },
    );
    const updatedPost = await getById(id);
    return updatedPost;
  };

module.exports = {
  create,
  getById,
  getAll,
  removePost,
  byTerm,
  removeById,
  update,
};