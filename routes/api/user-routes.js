const router = require('express').Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

router
.route("/")
.get(getAllUsers)
.post(createUser);
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router; 