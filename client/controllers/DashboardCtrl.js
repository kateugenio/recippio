App.controller('DashboardController', function($scope, UserFactory, RecipeFactory, IngredientFactory, $location){
	
	
	var ingredients = [];
	var oneRecipeIngredients = [];
	var allIngredients = [];
	var apiKey = '';
	var recipeIngredients = [];
	$scope.ingredients = {};
	$scope.showRecipeDiv = false;
	$scope.showPanel = false;
	$scope.loading = false;
	$scope.viewMoreBtn = false;
	$scope.showRecipeDiv2 = false;
	$scope.showRecipeDiv3 = false;
	$scope.showRecipeDiv4 = false;
	$scope.usedIngredients = [];
	$scope.missingIngredients = [];

	function getLoggedInUser(){
		UserFactory.getLoggedInUser()
		.then(function(serverResponse){
			$scope.userFirstName = serverResponse.data.first_name;
		})
		.catch(function(err){
			console.log(err);
		})
	}
	getLoggedInUser();

	$scope.logout = function(){
		UserFactory.logout()
		.then(function(res){
			$location.path('/');
		})
		.catch(function(err){
		})
	}

	function getUserIngredients(){
		IngredientFactory.getUserIngredients()
		.then(function(serverResponse){
			for (var i=0; i<serverResponse.data.ingredients.length; i++){
				allIngredients.push(serverResponse.data.ingredients[i].name);
			}
			$scope.userIngredients = serverResponse.data.ingredients;
			if (serverResponse.data.ingredients.length == 0 ){
				$('#welcomeModal').modal('show');
			}
		})
		.catch(function(err){
			console.log(err);
		})
	}
	getUserIngredients();


	$('#addIngBtn').on('click', function(){
		$scope.ingredient = '';
		$scope.ingNameError = false;
		$scope.ingCategoryError = false;
		$scope.ingQuantityError = false;
		$scope.ingAddSuccess = false;
	});

	$scope.addIngredient = function(){
		IngredientFactory.addIngredient($scope.$parent.ingredient)
		.then(function(serverResponse){
			if (serverResponse.data.errors){
				$scope.ingAddSuccess = false;
				if (serverResponse.data.errors.name){
					$scope.ingNameError = true;
				}
				if (serverResponse.data.errors.category){
					$scope.ingCategoryError = true;
				}
				if (serverResponse.data.errors.quantity){
					$scope.ingQuantityError = true;
				}
			}
			else {
				$scope.ingNameError = false;
				$scope.ingCategoryError = false;
				$scope.ingQuantityError = false;
				$scope.ingAddSuccess = true;
				$scope.ingredient = '';
				getUserIngredients();
				$location.path('/dashboard');
			}
		})
		.catch(function(err){
			console.log(err);
		})
	}

	$scope.findRecipe = function(){
		$scope.loading = true;
		document.getElementById("loading").style.width = "100%";
		$scope.usedIngredients = [];
		$scope.missingIngredients = [];
		recipeIngredients = [];
		oneRecipeIngredients = [];
		for (var i in $scope.ingredients){
			if ($scope.ingredients[i] === true) {
				ingredients.push(i);
			}
		}
		
		//get api key
		RecipeFactory.getApiKey()
		.then(function(apikey){
			console.log(apikey.data);
			apiKey = apikey.data;

			//spoonacular api call//
			RecipeFactory.getRecipes(ingredients, apiKey)
			.then(function(apiRes){
				$scope.loading = false;
				$scope.showRecipeDiv = true;
				$scope.showPanel = true;
				$scope.viewMoreBtn = true;
				$scope.foundRecipes = apiRes.data;
			})

			for (var i=0; i<ingredients.length; i++){
				oneRecipeIngredients.push(ingredients[i].toLowerCase());
			}
			ingredients = [];
		})
	}

	$scope.viewMoreRecipes = function(){
		if ($scope.showRecipeDiv === true && $scope.showRecipeDiv2 === false) {
			$scope.showRecipeDiv2 = true;
		}
		else if ($scope.showRecipeDiv === true && $scope.showRecipeDiv2 === true && $scope.showRecipeDiv3 === false) {
			$scope.showRecipeDiv3 = true;
		}
		else if ($scope.showRecipeDiv === true && $scope.showRecipeDiv2 === true && $scope.showRecipeDiv3 === true && $scope.showRecipeDiv4 === false) {
			$scope.showRecipeDiv4 = true;
			$scope.viewMoreBtn = false;
		}
	}

	

	$scope.showOneRecipe = function(recipeID){
		$scope.usedIngredients = [];
		$scope.missingIngredients = [];
		recipeIngredients = [];

		//get api key
		RecipeFactory.getApiKey()
		.then(function(apikey){
			apiKey = apikey.data;
			RecipeFactory.getOneRecipe(recipeID, apiKey)
			.then(function(apiRes){
				for (var i=0; i<apiRes.data.extendedIngredients.length; i++){
					recipeIngredients.push(apiRes.data.extendedIngredients[i].name);
				}
				$scope.recipe = apiRes.data;
				recipeIngredients.forEach(function(ing){
					for (var i in oneRecipeIngredients){
						if (ing.includes(oneRecipeIngredients[i])){
							$scope.usedIngredients.push(ing);
						}
					}
				})

				$scope.usedIngredients.forEach(function(ing){
					for (var i in recipeIngredients){
						if (ing == recipeIngredients[i]){
							recipeIngredients.splice(i, 1);
							break
						}
					}
				})

				$scope.missingIngredients = recipeIngredients;
			})
		});
	}

	$scope.deleteIngredient = function(ingredient){
		IngredientFactory.deleteIngredient(ingredient)
		.then(function(res){
			getUserIngredients();
		})
		.catch(function(err){
			console.log(err);
		})
	}
})