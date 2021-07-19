const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const router = require('express').Router();
const ValidationError = require('../errors/validation-err');
const {
  getCard,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const methodValidation = (value) => {
  const method = validator.isURL(value, { require_protocol: true });
  if (!method) {
    return new ValidationError('Введены некорректные данные');
  }
  return value;
};

router.get('/cards', getCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().custom(methodValidation, 'Validation Link'),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

module.exports = router;
