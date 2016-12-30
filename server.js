var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session');
    port = process.env.PORT;

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));

// ROUTES //////////////////////
require('./server/config/routes.js')(app);
///////////////////////////////

// MONGODB //////////////////////
require('./server/config/mongoose.js')
///////////////////////////////

app.listen(port || 8000, function(){
  console.log(`Listening on ${port}`);
})
