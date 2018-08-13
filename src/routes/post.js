const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

// router.post('/1', (req, res, next) => {
//   User.find((err, users) => {
//     if(err) return next(err);
//     res.json(users);
//   });
// });

router.post('/1', (req, res, next) => {
  Post.find({})
  .populate('postedBy')
  .populate('comments.postedBy')
  .exec(function(error, posts) {
    if(posts){
        res.json({type: 1, data: posts});
    }else{
        res.json({type: 0, data: 'Error...'});
    }      
  })  
});

router.post('/2', (req, res, next) => {
  let dataUser = req.body;
  console.log('dataUser: ',dataUser);
  Post.findOne({title: dataUser.title},(err, post) => {
    if(post){    
      res.json({type: 0, data: 'El Post Ya Existe'});
    }else {
      // let u = new User({name: dataUser.name, lastName: dataUser.lastName, email: dataUser.email, password: dataUser.password});
      var p = new Post({
        title: "Hello World",
        postedBy: dataUser.by,
        comments: [{
            text: "Nice post!",
            postedBy: dataUser.id
        }, {
            text: "Thanks :)",
            postedBy: dataUser.id
        }]
    	})
      p.save((err, post) => {
        if(post){
					res.json({type: 1, data: post});
        }else{
          res.json({type: 0, data: 'El Post No Se Ha Podido Guardar En La Base de Datos'});
        }
      })      
    }
  });
});


router.post('/3', (req, res, next) => {
	let dataUser = req.body;
  Post.update(
    { _id: dataUser.id }, 
    { $push: { comments: {text: dataUser.text, postedBy: dataUser.by} } },
    (error, post) => {
			res.json({type: 1, data: post});
		}	
	); 
});

module.exports = router;