// Module dependencies.
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = mongoose.models.Post,
    api = {};

// ALL
api.posts = function (req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({posts: posts});
    }
  });
};

// GET
api.post = function (req, res) {
  var id = req.params.id;
  Post.findOne({ '_id': id }, function(err, post) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({post: post});
    }
  });
};

// POST
api.addPost = function (req, res) {

  var post;

  if(typeof req.body.post == 'undefined'){
    return res.status(500).json({message: 'post is undefined'});
  }
  post = new Post(req.body.post);
  post.save(function (err) {
    if (!err) {
      console.log("created post");
      return res.status(201).json(post.toObject());
    } else {
       return res.status(500).json(err);
    }
  });

};

// PUT
api.editPost = function (req, res) {
  var id = req.params.id;

  Post.findById(id, function (err, post) {

    if(typeof req.body.post["titre"] != 'undefined'){
      post["titre"] = req.body.post["titre"];
    }
    if(typeof req.body.post["prix"] != 'undefined'){
      post["prix"] = req.body.post["prix"];
    }
    if(typeof req.body.post["email"] != 'undefined'){
      post["email"] = req.body.post["email"];
    }
    if(typeof req.body.post["ville"] != 'undefined'){
      post["ville"] = req.body.post["ville"];
    }
    return post.save(function (err) {
      if (!err) {
        console.log("updated post");
        return res.status(200).json(post.toObject());
      } else {
       return res.status(500).json(err);
      }
      return res.status(200).json(post);
    });
  });

};

// DELETE
api.deletePost = function (req, res) {
  var id = req.params.id;
  Post.findById(id, function (err, post) {
    return post.remove(function (err) {
      if (!err) {
        console.log("removed post");
        return res.status(204).send();
      } else {
        console.log(err);
        return res.status(500).json(err);
      }
    });
  });

};


router.get('/posts', api.posts);
router.post('/post', api.addPost);

router.route('/post/:id')
  .get(api.post)
  .put(api.editPost)
  .delete(api.deletePost);


module.exports = router;
