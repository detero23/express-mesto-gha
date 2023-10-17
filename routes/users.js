const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  getUsers,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
// eslint-disable-next-line no-useless-escape
const pattern = '/^(http|https):\/\/[^ "]+$/';

router.get('/me', getMe);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.get('/', getUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(pattern)),
  }),
}), updateAvatar);

module.exports = router;
