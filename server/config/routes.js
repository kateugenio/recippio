var User = require('../controllers/users');
var Ingredient = require('../controllers/ingredients');
var API = require('../controllers/spoonacularapi');

module.exports = function(app){
	app.get('/', function(req, res){
		req.session.user = '';
		console.log("session user is :", req.session.user);
		res.sendFile(__dirname + '../../client/index.html');
	});
	app.post('/register', User.create);
	app.post('/login', User.login);
	app.get('/user', User.show);
	app.put('/user', User.update);
	app.delete('/user/:id/delete', User.delete);
	app.get('/logout', User.logout);
	app.post('/ingredient', Ingredient.create);
	app.put('/ingredients/:id', Ingredient.update);
	app.delete('/ingredient/:id', Ingredient.delete);
	app.get('/ingredients', Ingredient.show);
	app.get('/apikey', API.getApiKey);
}