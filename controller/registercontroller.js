var mongo= require('mongoose');
mongo.connect('mongodb://localhost:27017/register');

var bp= require('body-parser');

var urlep= bp.urlencoded({extended: false});

module.exports = function(app) {


var regSchema= new mongo.Schema({
	name: String,
	email: String,
	phone: Number,
	dob: Date
});

var Register= mongo.model('Register', regSchema);


app.set('view engine', 'ejs');

app.get(['/', '/home'], function(req, res){
	res.render('home');
});

app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register',urlep, function(req, res){
	
	console.log(req.body);
	
	var newReg = Register({name: req.body.name, email: req.body.email, phone: req.body.phone, dob: req.body.date}).save(function(err){
	if(err) throw err;
	res.render('home');
	});
});

app.get('/seeregister', function(req, res){
	Register.find({}, function(err, data){
		if(err) throw err;
		var records= data.length;
		//console.log(data);
		res.render('seeregister', {recno: records, data: data});
	});	
});

app.delete('/seeregister/:email', function(req, res){
	Register.find({email: req.params.email}).remove(function(err, data){
		
		if(err) throw err;
		res.json(data);
	});	

});


};