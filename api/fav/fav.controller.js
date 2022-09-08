const {
  getAllFav,
  getFav,
  createFav,
  updateFav,
  deleteFav,
} = require('./fav.services');

async function getAllFavHandler(req, res) {
  const fav = await getAllFav();
  return res.status(200).json(fav);
}

async function createFavHandler(req, res) {
  const { fav } = req.body;
  const user = req.user;
  try {
    const newFav = await createFav(fav);
    return res.status(200).json(newFav);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getFavHandler(req, res) {
  const { id } = req.params;
  try {
    const fav = await getFav(id);
    return res.status(200).json(fav);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function deleteFavHandler(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteFav(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//TODO update

module.exports = {
  getAllFavHandler,
  getFavHandler,
  createFavHandler,
  deleteFavHandler,
};
