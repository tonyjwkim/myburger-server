const express = require("express");
const router = express.Router();
const {
  getAllContentsForUser,
  deleteContentForUser,
  addContentForUser,
} = require("../controllers/folderController");

router.get("/:userId/contents", getAllContentsForUser);
router.delete("/:userId/contents/:contentId", deleteContentForUser);
router.post("/:userId/contents", addContentForUser);

module.exports = router;
