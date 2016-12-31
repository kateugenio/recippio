var User = require('../models/user');

module.exports = {
	create: function(req, res){
		var email = req.body.email.toLowerCase();
		User.findOne({email: email}, function(err, user){
			if (err){
				res.send(err);
			}
			else {
				if (user === null){
					User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: email, password: req.body.password}, function(err, newUser){
						if (err){
							res.json(err);
						}
						else {
							User.hashpw(req.body.password, function(hashedPW){
								if (hashedPW){
									newUser.password = hashedPW;
									newUser.save();
									req.session.user = newUser._id;
									res.json(newUser);
								}
							})
						}
					})
				}
				else {
					res.json(false);
				}
			}
		})
	},
	login: function(req, res){
		var email = req.body.login_email.toLowerCase();
		User.findOne({email: email}, function(err, user){
			if (err){
				res.json(err);
			}
			else {
				if (user === null){
					res.json(false);
				}
				else {
					User.checkPassword(user.password, req.body.login_pw, function(result){
						if (result){
							console.log(result);
							req.session.user = user._id;
							console.log("user id is: ", req.session.user);
							res.json(user);
						}
						else {
							console.log(result);
							res.json(false);
						}
					})
				}
			}
		})
	},
	show: function(req, res){
		User.findById(req.session.user, function(err, user){
			if (err){
				res.json(err);
			}
			else {
				res.json(user);
			}
		})
	},
	update: function(req, res){
		User.findById(req.session.user, function(err, user){
			if (err){
				res.json(err);
			}
			else {
				user.first_name = req.body.update_first_name;
				user.last_name = req.body.update_last_name;
				user.save(function(err, result){
					res.json(result);
				})
			}
		})
	},
	delete: function(req, res){
		User.remove({_id: req.params.id}, function(err){
			if (err){
				res.json(err);
			}
			else {
				res.json(true);
			}
		})
	},
	logout: function(req, res){
		req.session.user = '';
		console.log("user session is :", req.session.user);
		res.json(true);
	}
}
