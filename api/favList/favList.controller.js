const {
  getAllFavList,
  getFavList,
  createFavList,
  updateFavList,
  deleteFavList,
} = require('./favList.services');

async function getAllFavListHandler(req, res) {
  const favList = await getAllFavList();
  return res.status(200).json(favList);
}

async function createFavListHandler(req, res) {
  const { favList } = req.body;
  const user = req.user;
  try {
    const newFavList = await createFavList(favList);
    return res.status(200).json(newFavList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const favList = await getFavList(id);
    return res.status(200).json(favList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function deleteFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteFavList(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//TODO update

module.exports = {
  getAllFavListHandler,
  getFavListHandler,
  createFavListHandler,
  deleteFavListHandler,
};
