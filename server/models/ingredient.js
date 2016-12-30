var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('../models/user');


var IngredientSchema = new Schema({
	name: {type: String, required: true},
	category: {type: String, required: true},
	quantity: {type: String, required: true},
	qtyMeasure: {type: String},
	notes: {type: String, maxlength: 255},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model("Ingredient", IngredientSchema);