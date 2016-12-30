var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
require('../models/ingredient');

var UserSchema = new Schema({
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true, match: /\S+@\S+\.\S+/},
	password: {type: String, required: true, minlength: 3},
	ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
}, {timestamps: true});

UserSchema.statics.hashpw = function(pw, cb){
	var hashedPW = bcrypt.hashSync(pw, bcrypt.genSaltSync(8));
	return cb(hashedPW);
}

UserSchema.statics.checkPassword = function(userPW, loginPW, cb){
	var result = bcrypt.compareSync(loginPW, userPW);
	return cb(result);
}

module.exports = mongoose.model("User", UserSchema);