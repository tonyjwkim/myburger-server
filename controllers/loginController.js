const User = require("../models/User");

async function login(req, res, next) {
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        name: req.user.name,
      });

      return res.status(201).json({
        success: true,
        userId: user._id,
        message: "User signed up successfully",
      });
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      message: "User signed in successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
