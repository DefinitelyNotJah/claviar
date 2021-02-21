const { model, Schema } = require('mongoose')

const matches = Schema({
	owner : {
		type : String,
		default : ''
	},
	text : {
		type : String,
		default : ''
	},
	textinArray : {
		type : Array,
		default : []
	},
	wpm : {
		type : Object,
		default : {}
	},
	mistakes : {
		type : Array,
		default : []
	},
	data1 : {
		type : Array,
		default : []
	},
	data2 : {
		type : Array,
		default : []
	},
	time : {
		type : Array,
		default : []
	},
	date : {
		type : Date,
		default : Date()
	}
})

module.exports = model('matches', matches)