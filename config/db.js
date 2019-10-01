'use strict';
const crypto = require('crypto');
module.exports = function() {
  return {
    movieList: [],

    // Save movie to db
    save(movie) {
      movie.id = crypto.randomBytes(20).toString('hex');
      this.movieList.push(movie);
      return 1;
    },

    // Retrive a movie
    find(id) {
      if (id) {
        return this.movieList.find(element => {
          return element.id === id;
        });
      } else {
        return this.movieList;
      }
    },

    // Delete a movie with given id
    remove(id) {
      let found = 0;
      this.movieList = this.movieList.filter(element => {
        if (element.id === id) {
          found = 1;
        } else {
          return element.id !== id;
        }
      });
      return found;
    },

    // Update a movie with given id
    update(id, movie) {
      let movieIndex = this.movieList.findIndex(element => {
        return element.id === id;
      });

      if (movieIndex !== 1) {
        this.movieList[movieIndex].title = movie.title;
        this.movieList[movieIndex].year = movie.year;
        return 1;
      } else {
        return 0;
      }
    }
  };
};
