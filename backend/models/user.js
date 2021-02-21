const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const users = Schema({
	email : {
		type : String,
		default : ''
	},
	username : {
		type : String,
		default : ''
	},
	password : {
		type : String,
		default : ''
	},
	countrycode : {
		type : String,
		default : ''
	},
	banned : {
		type : Boolean,
		default : false
	},
	admin : {
		type : Boolean,
		default : false
	},
	personalBest : {
		type : Number,
		default : 0
	},
	matchesId : {
		type : Array,
		default : []
	},
	date : {
		type : Date,
		default : Date()
	}
})

users.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

users.methods.validPassword = (password, password2) => {
	return bcrypt.compareSync(password, password2);
};

module.exports = model('users', users)