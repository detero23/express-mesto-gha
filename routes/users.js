const router = require('express').Router();
const {
  getUserById,
  getUsers,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getMe);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
