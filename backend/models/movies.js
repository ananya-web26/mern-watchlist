const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  director: String,
  genre: String,
  rating: Number,   
  favorite: { type: Boolean, default: false },
  poster: String,
});

module.exports = mongoose.model('Movie', movieSchema); 