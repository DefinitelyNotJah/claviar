// Loading up dependancies
const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const { connect } = require('mongoose');

// Starting our app
const app = express()

// Configuration
const config = require('./config.json')

// Port
const port = process.env.PORT || 5000

// Middlewares
app.use(helmet())
app.use(cors())
/*
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://51.83.46.202:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})
*/

// Bodyparser equivilant 
app.use(express.json())

// Loading our routes
require('./routes')(app);

// Error Handing for next()
app.use((error, req, res, next) => {
	res.send({
		success: false,
		message: error.message
	});
});

// Initializing the App
( async () => {
	await connect(config.mongodbURL, {
		useFindAndModify : false,
		useUnifiedTopology : true,
		useNewUrlParser : true
	})
	app.listen(port, (err) => {
		if(err)
			return console.log(`[ERROR] An error has occurred : ${err}`)
		console.log(`[INFO] Listening on port ${port}`)
	})
} ) () ;

