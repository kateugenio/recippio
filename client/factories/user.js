App.factory('UserFactory', function($http){
	var factory = {};

	factory.login = function(login){
		return $http.post('/login', login)
	}

	factory.register = function(newUser){
		return $http.post('/register', newUser)
	}

	factory.getLoggedInUser = function(){
		return $http.get('/user')
	}

	factory.logout = function(){
		return $http.get('/logout')
	}

	return factory;
})