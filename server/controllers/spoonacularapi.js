module.exports = {
	getApiKey: function(req, res){
		var apikey = process.env.SPOONACULAR_API_KEY;
		res.json(apikey);
	}
}