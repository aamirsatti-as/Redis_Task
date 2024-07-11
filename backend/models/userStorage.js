const User = require("./userModel");
const Redis = require('redis')
const redisClient = Redis.createClient()
const EXPIRATION = 3600
redisClient.connect();
module.exports = (
  {
    ctx
  }
) => {
  const getUserContext = async (userUUID) => {
    const user = await User.findOne({
      attributes: [
        "email",
        "uuid",
        "id",
      ],
      where: {
        uuid: userUUID,
      },
      raw: true,
    });
    return user;
  };
  const updateUser = async (id, body) => {
    const user = await User.findByIdAndUpdate(id, body, { new: true })
    if (!user) {
      return false
    }
    await redisClient.del('users');
    await redisClient.del('user');
    return true
  };
  const deleteUser = async (id) => {
    const count = await User.findByIdAndDelete(id);
    if (count){
      await redisClient.del('users');
      await redisClient.del('user');
      return true
    }
    return false
  }

  const createUser = async (user) => {
    try {
      const response = await User.create(user);
      if (response) 
        {
          await redisClient.del('users');
          return response;
        }
    } catch (error) {
      throw error
    }
  };

  const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    if (user) return user;
    return false;
  };
  const getUser = async () => {
    try {
      const { _id } = ctx
      const value = await redisClient.get('user');
      if (value) {
        console.log('getting data from cache')
        return JSON.parse(value);
      }
      const user = await User.findOne({ _id });
      await redisClient.set('user', JSON.stringify(user), 'EX', EXPIRATION);
      return user;
    } catch (err) {
      console.log("Error :", err);
      return false;
    }
  };
  const getAllUsers = async (page = 1, limit = 4, sortOrder = 'desc') => {
    try {
      const value = await redisClient.get('users');
      if (value) {
        console.log('getting data from cache')
        return JSON.parse(value);
      }
      const sortOptions = {};
      sortOptions['createdAt'] = sortOrder === 'desc' ? -1 : 1;
      const users = await User.find()
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

      const totalUsers = await User.countDocuments();

      const result = {
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
      };

      await redisClient.set('users', JSON.stringify(result), 'EX', EXPIRATION);

      return result;
    } catch (err) {
      console.log("Error :", err);
      return false;
    }
  };


  return {
    createUser,
    getUserByEmail,
    getUserContext,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
  };
};
