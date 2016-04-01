var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	util = require('util'),
	path = require("path");
	
// Database connection
/* var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodegame');
 */

//Templating system - SWIG  http://paularmstrong.github.io/swig/
app.use(express.static('public'));
app.get('/', function(req, res, next) {  
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/', function (req, res) {
	//Accéder à la base de données
	var db = req.db;
	var collection = db.get('scores');
	console.log(request.body.fname);
    console.log(request.body.lname);
	collection.insert({name:"Anonyme", score:"100 points"});
});

app.listen(3000);