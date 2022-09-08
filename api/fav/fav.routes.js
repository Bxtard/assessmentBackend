const express = require('express');
const {
  getAllFavHandler,
  getFavHandler,
  createFavHandler,
  deleteFavHandler,
} = require('./fav.controller');

const router = express.Router();

router.get('/', getAllFavHandler);
router.post('/', createFavHandler);
router.get('/:id', getFavHandler);
router.delete('/:id', deleteFavHandler);

module.exports = router;
