App.factory('RecipeFactory', function($http){
	var factory = {};

	factory.getApiKey = function(){
		return $http.get('/apikey')
	}

	factory.getRecipes = function(ingredients, apiKey){
		return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+ingredients+"&limitLicense=false&number=24&ranking=1", {
  			headers: { "X-Mashape-Key": apiKey, "Accept": "application/json" }})
	}

	factory.getOneRecipe = function(recipeID, apiKey){
		return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recipeID+"/information?includeNutrition=false", {
  			headers: { "X-Mashape-Key": apiKey, "Accept": "application/json" }})
	}

	return factory;
})