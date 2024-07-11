const bcrypt = require("bcrypt");
const uuid = require("uuid");
const HttpError = require("../error/httpError");
// const userStorage = require('../models/userStorage')
const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = ({ userStorage }) => {
  const createUser = async (params) => {
    const { name, password, email, address } = params;
    const hashedPassword = await generateHash(password);
    const user = {
      email,
      name,
      password: hashedPassword,
      address: address
    };
    const isUserExists = await userStorage.getUserByEmail(email);
    if (isUserExists) {
      throw new HttpError(409, "User Already Exists");
    }
    const res = await userStorage.createUser(user);
    if (res) {
      return res;
    }
  };

  const getUser = async () => {
    const response = await userStorage.getUser();
    if (!response) {
      return false
    }
    return response
  };
  
  const getAllUsers = async (page,limit,sortOrder) => {
    const response = await userStorage.getAllUsers(page,limit,sortOrder);
    if (!response) {
      return false
    }
    return response
  };

  const updateUser = async (id, body) => {
    
    const response = await userStorage.updateUser(id, body);
    if (!response) {
      throw new HttpError(404, "User not found");

    }
    return true
  };

  const deleteUser = async (userId) => {
    const response = await userStorage.deleteUser(userId)
    if (!response) {
      return false
    }
    return response
  };

  const authenticate = async (email, password) => {
    const user = await userStorage.getUserByEmail(email);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    const authenticated = await bcrypt.compare(password, user.password);
    if (!authenticated) {
      throw new HttpError(403, "Invalid Password");
    }
    return user
  };
  return {
    createUser,
    authenticate,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
  };
};
