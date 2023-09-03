require("dotenv").config();
const { authenticate } = require("../middlewares/authMiddleware");

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

test("Successful Authentication with valid token", async () => {
  const mockRequest = {
    headers: {
      authorization: "Bearer VALID_TOKEN",
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(() => mockResponse),
  };

  const mockNext = jest.fn();

  const admin = require("firebase-admin");
  admin.auth().verifyIdToken.mockResolvedValue({ uid: "123" });

  await authenticate(mockRequest, mockResponse, mockNext);

  expect(mockNext).toHaveBeenCalled();
});
