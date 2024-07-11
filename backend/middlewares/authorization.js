const HttpError = require("../error/httpError");
const { authenticate } = require("../services/authService");
const context = require("../models/context");
const verifyToken = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) {
    return res.status(401).json({ message: "Token Not provided" });
  }

  try {
    const { authService, userStorage } = req._scope.cradle;
    const decoded = await authService.authenticate(authorization);
    const user = await userStorage.getUserContext(decoded.userUUID);
    req._scope = await context.setContext(req._scope, user);
    next();
  } catch (error) {
    console.log('err ', error)
    return res.status(401).json({ message: "error" });
  }
};

module.exports = {
  verifyToken
};