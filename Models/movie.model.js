const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "action",
      "comedy",
      "romance",
      "thriller",
      "fantasy",
      "sci-fi",
      "horror",
      "sports",
      "musical",
      "others",
    ],
  },
  director: {
    type: String,
    required: true,
  },
  actors: [
    {
      type: String, // Allows multiple actors in an array
    },
  ],
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  plot: {
    type: String,
  },
  awards: {
    type: String,
  },
  posterUrl: {
    type: String,
  },
  trailerUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
