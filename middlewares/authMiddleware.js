const admin = require("firebase-admin");

async function authenticate(req, res, next) {
  const idToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: "User verification failed: missing token",
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("decoded token in server:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
      errorDetail: error.message,
    });
  }
}

module.exports = {
  authenticate,
};
