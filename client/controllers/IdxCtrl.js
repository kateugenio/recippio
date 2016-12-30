App.controller('IndexController', function($scope, UserFactory, $location){

	$scope.logUserIn = function(){
		UserFactory.login($scope.login)
		.then(function(serverResponse){
			if (serverResponse.data === false){
				$scope.loginError = true;
			}
			else {
				$location.path('/dashboard');
			}
		})
	}

	$scope.initialRegister = function(){
		$location.path('/register');
	}

})