const express = require('express');
const {
  getAllFavListHandler,
  getFavListHandler,
  createFavListHandler,
  deleteFavListHandler,
} = require('./favList.controller');

const router = express.Router();

router.get('/', getAllFavListHandler);
router.post('/', createFavListHandler);
router.get('/:id', getFavListHandler);
router.delete('/:id', deleteFavListHandler);

module.exports = router;
