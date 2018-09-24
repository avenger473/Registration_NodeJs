var express= require('express');
var app= express();

var controller= require('./controller/registercontroller')

controller(app);


app.listen(3000);
console.log('Listining to 3000');