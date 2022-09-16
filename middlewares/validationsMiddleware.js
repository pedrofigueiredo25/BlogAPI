const validEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!email) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const validDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: '"name" is required' });
  }
  next();
};

const validBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  if (!categoryIds || !categoryIds.length) {
    return res
      .status(400)
      .json({ message: '"categoryIds" not found' });
  }
  next();
};

const validTitleAndContent = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validDisplayName,
  validEmail,
  validPassword,
  validName,
  validTitleAndContent,
  validBlogPost,
}; 