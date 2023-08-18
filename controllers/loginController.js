const User = require("../models/User");
const Folder = require("../models/Folder");
const ERRORS = require("../errorMessages");

async function login(req, res, next) {
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        name: req.user.name,
      });

      await Folder.create({
        userId: user._id,
        folderName: "My Folder",
        textContent: [
          {
            data: "Welcome to your new folder!",
          },
        ],
      });

      return res.status(201).json({
        success: true,
        userId: user._id,
        message: ERRORS.USER_SIGNED_UP_SUCCESSFULLY,
      });
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      message: ERRORS.USER_SIGNED_IN_SUCCESSFULLY,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserData(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.query.firebaseUid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: ERRORS.USER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  getUserData,
};
