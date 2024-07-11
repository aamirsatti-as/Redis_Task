const router = require('express-promise-router')();
const {  getUser, updateUser,deleteUser, getAllUsers } = require('../controllers/userController');
const { verifyToken } = require("../middlewares/authorization");

router.use(verifyToken);

router.get('/user',getUser)
router.get('/users',getAllUsers)
router.patch('/user/:id',updateUser)
router.delete('/user/:userId',deleteUser)
module.exports = router;
