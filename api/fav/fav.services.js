const Fav = require('./fav.model');

function getAllFav() {
  return Fav.find({});
}

function createFav(fav) {
  return Fav.create(fav);
}

function getFav(id) {
  return Fav.findById(id);
}

function deleteFav(id) {
  return Fav.findByIdAndDelete(id);
}

function updateFav(id, fav) {
  return Fav.findByIdAndUpdate(id, fav, { new: true });
}

module.exports = {
  getAllFav,
  getFav,
  createFav,
  updateFav,
  deleteFav,
};
