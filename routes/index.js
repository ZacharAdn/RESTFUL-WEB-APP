var express = require('express');
var router = express.Router();

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {//'/helloworld' the page whwre its shown
    res.render('helloworld', { title: 'Hello, World!' });// helloworld - the jade file name
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zahar Express' });
});


/* Get user list. */
router.get('/userlist' , function(req,res){
	var db = req.db;
	var collection = db.get('collection');
	collection.find({},{},function(e,docs){
		res.render('userlist' , {
			"userlist" : docs
		});
	});
});


/* Get new user page. */
router.get('/newuser', function(req,res){
	res.render('newuser' , { title : 'Add New User' });
});


/* Post to add user service. */
router.post('/adduser', function(req,res){
	var db = req.db;
	
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	var collection = db.get("collection");
	
	collection.insert({
		"username" : userName,
		"useremail" : userEmail
	}, function (err,doc){
		if(err){
			res.send("There was a problem adding the information to the database.");
        }else{
        	res.redirect("userlist");
        }
	});
});


module.exports = router;
