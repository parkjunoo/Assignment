const sql = require("./db.js");

//영화 model
const Movie = function(movies) {
  this.movie_title = movies.movie_title;
  this.movie_published = movies.movie_published;
  this.movie_score = movies.movie_score;
  this.movie_description = movies.movie_description;
  this.movie_age = movies.movie_age;
};

Movie.create = (newMovie, result) => {
  sql.query("INSERT INTO movie SET ?", newMovie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created movie: ", { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};

Movie.findById = (movieName, result) => {

  sql.query(`SELECT * FROM movie WHERE movie_title like \"%${movieName}%\"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found movie: ", res);
      result(null, res);
      console.log("{}{}", res)
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = result => {
  sql.query("SELECT * FROM movie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("movies: ", res);
    result(null, res);
  });
};

Movie.updateById = (id, movie, result) => {
  sql.query(
    "UPDATE movie SET movie_title = ?, movie_published = ?, movie_score = ?, movie_description = ?, movie_age = ? WHERE _id = ?",
    [movie.movie_title, movie.movie_published, movie.movie_score, movie.movie_description, movie.movie_age, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated movier: ", { id: id, ...movie });
      result(null, { id: id, ...movie });
    }
  );
};

Movie.remove = (id, result) => {
  sql.query("DELETE FROM movie WHERE _id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie with id: ", id);
    result(null, res);
  });
};

module.exports = Movie;
