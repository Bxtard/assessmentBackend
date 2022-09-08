const mongoose = require('mongoose');
const favListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fav',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavList = mongoose.model('FavList', favListSchema);

module.exports = FavList;
