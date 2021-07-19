const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const router = require('express').Router();
const ValidationError = require('../errors/validation-err');
const {
  getUsers,
  getUserId,
  patchUser,
  patchAvatar,
  getUser,
} = require('../controllers/users');

const methodValidation = (value) => {
  const method = validator.isURL(value, { require_protocol: true });
  if (!method) {
    return new ValidationError('Введены некорректные данные');
  }
  return value;
};

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserId);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(methodValidation, 'Validation Link'),
  }),
}), patchAvatar);

module.exports = router;
