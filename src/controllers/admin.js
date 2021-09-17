const User = require('../models/user');

module.exports.changeUserType = async (req, res, next) => {
  const username = req.params.userId;
  const { userType } = req.body;
  const user = await User.findOneAndUpdate({ username }, { $set: { userType } }, { new: true });
  if (user.userType === 'admin') {
    const err = { message: 'Forbidden, You don\'t have the permission', statusCode: 403 };
    next(err);
  }
  res.send(user);
};
