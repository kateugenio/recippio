var Ingredient = require('../models/ingredient');
var User = require('../models/user');

module.exports = {
	create: function(req,res){
		User.findOne({_id: req.session.user}, function(err, user){
			var ingredient = new Ingredient(req.body);
			ingredient._user = user._id;
			ingredient.save(function(err){
				if (err){
					res.json(err);
				}
				else {
					user.ingredients.push(ingredient._id);
					user.save(function(err){
						if (err){
							res.json(err);
						}
						else {
							res.json(ingredient);
						}
					})
				}
			})
		})
	},
	update: function(req, res){
		Ingredient.findById(req.params.id, function(err, ingredient){
			if (err){
				res.json(err);
			}
			else {
				ingredient.name = req.body.update_name;
				ingredient.category = req.body.update_category;
				ingredient.quantity = req.body.update_quantity;
				ingredient.notes = req.body.update_notes;
				ingredient.save(function(err, result){
					res.json(result);
				})
			}
		})
	},
	delete: function(req, res){
		Ingredient.remove({_id: req.params.id}, function(err){
			if (err){
				res.json(err);
			}
			else {
				User.findOne({_id: req.session.user}, function(err, user){
					var removeIngredient = user.ingredients.indexOf(req.params.id);
					if(removeIngredient != -1) {
						user.ingredients.splice(removeIngredient, 1);
					}
					user.save(function(err){
						if (err){
							res.json(err);
						}
					})
				})
				res.json(true);
			}
		})
	},
	show: function(req, res){
		User.findOne({_id: req.session.user})
		.populate('ingredients')
		.exec(function(err, user){
			res.json(user);
		})
	}
}