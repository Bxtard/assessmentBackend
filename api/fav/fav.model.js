const mongoose = require('mongoose');
const favSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  favList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FavList',
    required: true,
  },
  link: {
    type: String,
  },
});

const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;
