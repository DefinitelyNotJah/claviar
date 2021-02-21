const userSchema = require('../models/user')
const tokenSchema = require('../models/token')

module.exports = (tokenValue, publicId) => {
	return new Promise( async (resolve, reject) => {
		if(!tokenValue || !publicId)
			reject(new Error('Token Value is invalid'))
		const tokenSearch = await tokenSchema.findOne({ value : tokenValue,
										 valid : true,
										 publicId
										})
		if(!tokenSearch)
			reject(new Error('Token invalid'))
		const userSearch = await userSchema.findOne({ _id : tokenSearch.publicId })
		if(!userSearch)
			reject(new Error('Token invalid'))
		resolve(userSearch)
	})
}