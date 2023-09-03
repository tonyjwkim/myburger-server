const Folder = require("../models/Folder");
const MESSAGES = require("../statusMessages");
const { sendEventsToAll } = require("../eventBroadcaster");

async function getAllContentsForUser(req, res) {
  try {
    const folder = await Folder.findOne({
      userId: req.params.userId,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.NO_CONTENT_FOR_USER,
      });
    }

    res.status(200).json({
      success: true,
      contents: folder.textContent,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: MESSAGES.INVALID_REQUEST_PARAMS,
    });
  }
}

async function deleteContentForUser(req, res) {
  try {
    const { userId, contentId } = req.params;

    const result = await Folder.updateOne(
      { userId },
      { $pull: { textContent: { _id: contentId } } },
    );
    if (result.n === 0) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.FOLDER_NOT_FOUND,
      });
    }

    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.CONTENT_NOT_FOUND,
      });
    }

    res.status(200).json({
      success: true,
      message: MESSAGES.CONTENT_DELETED_SUCCESSFULLY,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: MESSAGES.INVALID_CONTENT,
    });
  }
}

async function addContentForUser(req, res) {
  try {
    const { textContent, url, title } = req.body;
    const { userId } = req.params;

    if (!textContent) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.MISSING_OR_INVALID_TEXT,
      });
    }

    const result = await Folder.updateOne(
      { userId },
      {
        $push: {
          textContent: {
            data: textContent,
            url: url,
            title: title,
          },
        },
      },
    );

    if (result.n === 0) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.USER_FOLDER_NOT_FOUND,
      });
    }

    sendEventsToAll({
      action: "newContent",
      userId,
      content: { data: textContent, url, title },
    });

    res.status(201).json({
      success: true,
      message: MESSAGES.CONTENT_SAVED_SUCCESSFULLY,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: MESSAGES.ERROR_SAVING_CONTENT,
    });
  }
}

module.exports = {
  getAllContentsForUser,
  deleteContentForUser,
  addContentForUser,
};
