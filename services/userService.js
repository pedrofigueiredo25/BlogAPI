const { User } = require('../database/models');
const errorMessage = require('../utils/errorMessage');
const generateJWT = require('../utils/generateJWT');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw errorMessage(400, 'Invalid fields');
  }
  const { password: passDB, ...userWithoutPassword } = user.dataValues;
  const token = generateJWT(userWithoutPassword);
  return token;
};

  const create = async ({ displayName, email, password, image }) => {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) throw errorMessage(409, 'User already registered');
    const createdUser = await User.create({ displayName, email, password, image });
    const { password: passDB, ...userWithoutPassword } = createdUser.dataValues;
    const token = generateJWT(userWithoutPassword);
    return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ 
    where: { id },
    attributes: { exclude: ['password'] },
 });
  if (!user) throw errorMessage(404, 'User does not exist');
  return user;
};

const removeUser = async (user) => {
  const { dataValues: { id } } = await getUserByEmail(user.data.email);
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  login,
  getAll,
  getById,
  getUserByEmail,
  removeUser,
}; 