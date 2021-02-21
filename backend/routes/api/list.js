const checkUser = require('../../functions/checkUser')
const userSchema = require('../../models/user')

module.exports = app => {
	app.get('/list', async (req, res, next) => {
		try {
			//const userAccount = await checkUser(authprivate, authpublic)
			const listUser = await userSchema.find( {} ).sort({personalBest: -1}).limit(10)
			let listReturn = []

			listUser.forEach ( (e, i) => {
				listReturn.push({
					id : i + 1,
					username : e.username,
					speed : e.personalBest
				})
			})
		 	return res.send({
		 		success : true,
		 		message : listReturn
		 	})
		} catch (err)
		{
			console.log(err)
			return next(err)
		}
	})
}