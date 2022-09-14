const mongoose = require('mongoose');
const favListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fav',
    },
  ],
});

const FavList = mongoose.model('FavList', favListSchema);

module.exports = FavList;
