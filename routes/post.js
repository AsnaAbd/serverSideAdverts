var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */

var mongoose = require('mongoose');
var Post = mongoose.models.Post;

router.get('/posts', function (req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.render('view_posts', {posts: posts});
    }
  });
});

router.get('/annonces', function (req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.render('view_annonces', {posts: posts});
    }
  });
});


router.get('/update', function (req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.render('view_update', {posts: posts});
    }
  });
});



router.post('/posts', function (req, res) {
      var post=new Post(req.body);
      post.save(function (err){
        if (err) {
          console.log("erreur post");
          res.status(500).json(err);
        } else {
          res.redirect('/annonces');
        }
      });
});

/* Supprime un élément de la liste */
router.post('/supprimer/:id', function(req, res) {
  var id = req.params.id;

  Post.findById(id, function (err, post) {
     post.remove(function (err) {
      if (!err) {
        console.log("removed post");
      //  res.status(204).send();
        res.redirect('/annonces');
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
    });
});




module.exports = router;
