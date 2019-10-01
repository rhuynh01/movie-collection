'use strict';
const db = require('../../config/db')();

module.exports = { getAll, save, getOne, update, delMovie };

// GET /movies
function getAll(req, res, next) {
  res.json({ movies: db.find() });
}

// POST /movies
function save(req, res, next) {
  res.json({
    success: db.save(req.body),
    description: 'Movie add successfully!'
  });
}

// GET /movies/{id}
function getOne(req, res, next) {
  const id = req.swagger.params.id.value;
  const movie = db.find(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(204).send();
  }
}

// PUT /movies/{id}
function update(req, res, next) {
  const id = req.swagger.params.id.value;
  const movie = req.body;
  if (db.update(id, movie)) {
    res.json({ success: 1, description: 'Movies updated successfully!' });
  } else {
    res.status(204).send();
  }
}

// DELETE /movies/{id}
function delMovie(req, res, next) {
  const id = req.swagger.params.id.value;
  if (db.remove(id)) {
    res.json({ success: 1, description: 'Movie deleted successfully!' });
  }
}
