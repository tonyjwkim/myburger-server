const Folder = require("../models/Folder");
const ERRORS = require("../errorMessages");

async function getAllContentsForUser(req, res) {
  try {
    const folder = await Folder.findOne({
      userId: req.params.userId,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: ERRORS.NO_CONTENT_FOR_USER,
      });
    }

    res.status(200).json({
      success: true,
      contents: folder.textContents,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: ERRORS.INVALID_REQUEST_PARAMS,
    });
  }
}

async function deleteContentForUser(req, res) {
  try {
    const { userId, contentId } = req.params;

    const result = await Folder.updateOne(
      { userId },
      { $pull: { contents: { _id: contentId } } },
    );

    if (result.n === 0) {
      return res.status(403).json({
        success: false,
        message: ERRORS.FOLDER_NOT_FOUND,
      });
    }

    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: ERRORS.CONTENT_NOT_FOUND,
      });
    }

    res.status(200).json({
      success: true,
      message: ERRORS.CONTENT_DELETED_SUCCESSFULLY,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: ERRORS.INVALID_CONTENT,
    });
  }
}

async function addContentForUser(req, res) {
  try {
    const { textContent } = req.body;
    const { userId } = req.params;

    if (!textContent) {
      return res.status(400).json({
        success: false,
        message: ERRORS.MISSING_OR_INVALID_TEXT,
      });
    }

    const result = await Folder.updateOne(
      { userId },
      { $push: { textContent: { data: textContent } } },
    );

    if (result.n === 0) {
      return res.status(404).json({
        success: false,
        message: ERRORS.USER_FOLDER_NOT_FOUND,
      });
    }

    res.status(201).json({
      success: true,
      message: ERRORS.CONTENT_SAVED_SUCCESSFULLY,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: ERRORS.ERROR_SAVING_CONTENT,
    });
  }
}

module.exports = {
  getAllContentsForUser,
  deleteContentForUser,
  addContentForUser,
};
