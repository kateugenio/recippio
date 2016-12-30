App.controller('RecipeController', function($scope, RecipeFactory, $routeParams, $location){
	RecipeFactory.getOneRecipe($routeParams.id)
	.then(function(apiRes){
		console.log(apiRes.data);
		$scope.recipe = apiRes.data;
	})
})