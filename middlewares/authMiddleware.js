const admin = require("firebase-admin");
const MESSAGES = require("../statusMessages");

async function authenticate(req, res, next) {
  const idToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.USER_VERIFICATION_FAILED,
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: MESSAGES.INVALID_CREDENTIALS,
    });
  }
}

module.exports = {
  authenticate,
};
