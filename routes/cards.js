const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', putCardLike);
router.delete('/:id/likes', deleteCardLike);

module.exports = router;
