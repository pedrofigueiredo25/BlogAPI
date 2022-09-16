const userService = require('../services/userService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    return res
      .status(200)
      .json({ token });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);
    return res
      .status(201)
      .json({ token });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll(req.user); 
    return res
      .status(200)
      .json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await userService.removeUser(req.user);
    return res
      .status(204)
      .end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  login,
  getAll,
  getById,
  remove,
}; 