const checkUser = require('../../functions/checkUser')

const yup = require('yup');

const schema = yup.object().shape({
	authprivate: yup.string().length(64).required(),
	authprivate: yup.string().required()
});

module.exports = app => {
	app.get('/authenticate/', async (req, res, next) => {
		const {
			authpublic,
			authprivate
		} = req.headers
		try {
			await schema.validate({
				authprivate,
				authpublic
			})
			
			const userAccount = await checkUser(authprivate, authpublic)

		 	return res.send({
		 		success : true,
		 		message : [userAccount.username, userAccount.email, userAccount.personalBest]
		 	})
		} catch (err)
		{
			console.log(err)
			return next(err)
		}
	})
}