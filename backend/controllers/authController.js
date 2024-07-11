const HttpError = require("../error/httpError");
const logger = require('../logger/logger')
const login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const { userService, authService } = req._scope.cradle;
    const user = await userService.authenticate(email, password);
    const userID = user._id;
    const auth = authService.getJWTToken({
      userID,
    });
    res.status(200).json({ ...auth, user: user });
  } catch (err) {
    if (err instanceof HttpError) {
      logger.error(`${err.error}`);
      res.status(err.statusCode).json({ error: err.error });
    } else {
      logger.error(`${err.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
const signup = async (req, res) => {
  try {
    const { body: params } = req;
    const { userService } = req._scope.cradle;
    const response = await userService.createUser(params);
    if (response) {
      return res.status(200).json({ message: "User Created Successfully" });
    }
    return res.status(400).json({ message: "User creation failed" });
  } catch (err) {
    console.error("Error:", err);
    const validationErrors = JSON.parse(err.message);
    if (Array.isArray(validationErrors)) {
      validationErrors.forEach(error => {
        logger.error(`Validation Error: ${error.message}`);
      });
      return res.status(400).json({ message: "Validation Error", errors: validationErrors });
    }
    else if (err instanceof HttpError) {
      logger.error(`${err.error}`);
      res.status(err.statusCode).json({ error: err.error });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
module.exports = {
  login,
  signup,
};