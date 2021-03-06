  
const Movie = require("../models/movie.model.js");
const StillShot = require("../models/stillshot.model.js");

// movie 객체 생성
exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const movie = new Movie({
    movie_title: req.body.movie_title,
    movie_published: req.body.movie_published,
    movie_score: req.body.movie_score,
    movie_description: req.body.movie_description,
    movie_age: req.body.movie_age
  });

  //새로운 무비 등록
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "controller : create 생성되지 못했습니다."
      });
    else{  
      res.send(data.id.toString());
    }
  });
};

// 영화 전체 찾기 
exports.findAll = (req, res) => {
  Movie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "controller: findall : error"
      });
    else res.send(data);
  });


};

// 내용이 포함된 모든 영화 검색
exports.findKeywordAll = (req, res) => {
  Movie.findById(req.params.movieKeyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller: findOne: id없음 ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller: findOne: server " + req.params.movieId
        });
      }
    } else res.send(data);
  });
  
};

//영화 업데이트
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "controller: update : 다채워야한다."
    });
  }

  Movie.updateById(
    req.params.movieId,
    new Movie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `controller: updateByid Not found movie with id ${req.params.movieId}.`
          });
        } else {
          res.status(500).send({
            message: "controller: updateByid Error updating mvoie with id " + req.params.movieId
          });
        }
      } else res.send(data);
    }
  );
};

//영화 삭제
exports.delete = (req, res) => {
  Movie.remove(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller : delete : Not found movie with id ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller : delete : Could not delete movie with id " + req.params.movieId
        });
      }
    } else res.send({ message: `${req.params.movieId} deleted successfully!` });
  });
};

//스틸샷 생성
exports.createStillShot = (req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const stilllshot = new StillShot({
    movie_no : req.body.movieNo,
    movie_stillshot : req.body.moviePath
  });

  StillShot.create(stilllshot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "controller : create 생성되지 못했습니다."
      });
    else{  
      res.send(data);
    }
  });
}

//movie 아이디로 스틸샷 찾기
exports.findIdStillshot = (req, res) => {
  StillShot.findById(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller: findOne: id없음 ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller: findOne: server " + req.params.movieId
        });
      }
    } else{
      res.send(data);
    }
  });
};


exports.findIdStillshotUpdate = (req, res) => {
  StillShot.findByIdUpdate(req.params.movieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller: findOne: id없음 ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller: findOne: server " + req.params.movieId
        });
      }
    } else{
      let files = [];
      for(let i = 0; i < data.length; i++){
         result = data[i].movie_stillshot;
         
         files.push(result)
      }console.log(files)
      res.send(files);
    }
  });
};

// 관리자 정보 찾기
exports.authorize = (req, res) => {
  Admin.findById(req.params.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `controller: findOne: id없음 ${req.params.movieId}.`
        });
      } else {
        res.status(500).send({
          message: "controller: findOne: server " + req.params.movieId
        });
      }
    } else{
     console.log(req.session)
      
    }
  });
};