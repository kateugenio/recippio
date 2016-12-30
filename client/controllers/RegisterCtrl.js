App.controller('RegisterController', function($scope, UserFactory, $location, $routeParams){

	$scope.register = function(){
		if ($scope.newUser.confirmPW != $scope.newUser.password){
			$scope.PWMatchError = true;
		}
		else {
			UserFactory.register($scope.newUser)
			.then(function(serverResponse){
				if (serverResponse.data === false){
					$scope.userExistsError = true;
				}
				else if (serverResponse.data.errors){
					if (serverResponse.data.errors.email){
						$scope.emailError = true;
					}
					if (serverResponse.data.errors.first_name){
						$scope.firstNameError = true;
					}
					if (serverResponse.data.errors.last_name){
						$scope.lastNameError = true;
					}
					if (serverResponse.data.errors.password){
						$scope.passwordError = true;
					}
				}
				else {
					$location.path('/dashboard');
				}
			})
		}
	}
})
