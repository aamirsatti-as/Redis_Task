const { Job } = require('bullmq');
const { userQueue } = require('../redis/jobQueue')
const HttpError = require("../error/httpError");
const logger = require('../logger/logger')
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userService } = req._scope.cradle;
        const data = await userService.deleteUser(userId)
        if (data) {
            return res.status(200).json({ message: "User Deleted Successfully" });
        } else {
            return res.status(404).json({ message: "User Not Found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: params } = req;
        const { userService } = req._scope.cradle;
        const user = await userService.updateUser(id, params);
        return res.status(200).json({ message: "User Update Successfully" });

    } catch (err) {
        if (err instanceof HttpError) {
            logger.error(`${err.error}`);
            return res.status(400).json({ message: err.error });
        }
        else
            res.status(500).json({ error: "Internal Server Error" });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const { userService } = req._scope.cradle;
        const page = req.query.page;
        const limit = req.query.limit;
        const sortOrder = req.query.sortOrder
        const users = await userService.getAllUsers(page, limit, sortOrder);
        if (users)
            return res.status(200).json(users);
        return res.status(400).json({ message: "User Not Found" });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getUser = async (req, res) => {
    try {
        const { userService } = req._scope.cradle;
        const user = await userService.getUser();
        if (user)
            return res.status(200).json({ user });
        return res.status(400).json({ message: "User Not Found" });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





module.exports = {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
};
