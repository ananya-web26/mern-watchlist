require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/movies');

mongoose.connect('mongodb://127.0.0.1:27017/watchlist')
  .then(async () => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch(err => {
    console.log("MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('WORKING!!!!');
});
 
app.get('/api/movies', async (req, res) => {
  try {
    const movieList = await Movie.find({});
    res.json(movieList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const savedMovie = await Movie.create(req.body);
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid movie ID' });
  }
});

app.patch('/api/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 
app.listen(5001, () => {
  console.log("Server started on port 5001");
});