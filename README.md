#Introduction
This full stack MEAN application uses Node.js, ExpressJS and MongoDB as the backend and AngularJS, HTML, and CSS as the front end that requests users and ingredients from the Node server. It also calls a recipe API (Spoonacular). Add ingredients from your own pantry or refigerator, select a few, and find what recipes you can make out of what you have on hand.

#Installation
Install Node.js, which comes with a package manager called npm for installing various NodeJS libraries: (http://nodejs.org/)
###Get the code
    git clone https://github.com/kateugenio/recippio.git
    cd recippio


###Install dependencies
These dependencies are declared in the package.json file

    npm install
    npm install bower -g
    bower install

###Install MongoDB
For Mac (assuming Homebrew is already installed, if not, go here (http://brew.sh/)
    brew install Mongodb
Run the MongoDB server (make sure to "control + c" to shut it down)
    sudo mongod

#Get Spoonacular API key
You must sign up to get an API key with Spoonacular API (there is a free tier if requests are <50/day) (https://market.mashape.com/spoonacular/recipe-food-nutrition)

#Run the server
    node server.js
