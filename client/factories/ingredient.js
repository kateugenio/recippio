App.factory('IngredientFactory', function($http){
	var factory = {};

	factory.addIngredient = function(ingredient){
		return $http.post('/ingredient', ingredient)
	}

	factory.getUserIngredients = function(){
		return $http.get('/ingredients')
	}

	factory.deleteIngredient = function(ingredient){
		return $http.delete('/ingredient/'+ingredient)
	}

	return factory;
})