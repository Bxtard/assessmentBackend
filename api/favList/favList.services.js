const FavList = require('./favList.model');

function getAllFavList() {
  return FavList.find({}).populate('list');
}

function createFavList(favList) {
  return FavList.create(favList);
}

function getFavList(id) {
  return FavList.findById(id).populate('list');
}

function deleteFavList(id) {
  return FavList.findByIdAndDelete(id);
}

function updateFavList(id, favList) {
  return FavList.findByIdAndUpdate(id, favList, { new: true });
}

module.exports = {
  getAllFavList,
  getFavList,
  createFavList,
  updateFavList,
  deleteFavList,
};
