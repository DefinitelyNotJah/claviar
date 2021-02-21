const { model, Schema } = require('mongoose')

const tokens = Schema({
	value : {
		type : String,
		default : ''
	},
	valid : {
		type : Boolean,
		default : true
	},
	publicId : {
		type : String,
		default : ''
	},
	date : {
		type : Date,
		default : Date()
	}
})

module.exports = model('tokens', tokens)