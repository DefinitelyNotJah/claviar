const checkUser = require('../../functions/checkUser')
const matchSchema = require('../../models/matches')

const yup = require('yup');

const schema = yup.object().shape({
	authprivate: yup.string().length(64).required(),
	authpublic: yup.string().required(),
	wpm : yup.number().required(),
	netwpm : yup.number().required(),
	text : yup.string().required(),
	incorrectWords : yup.number().required(),
	accuracy : yup.number().min(0).max(100).required()
});

module.exports = app => {
	app.post('/submitScore', async (req, res, next) => {
		const {
			authpublic,
			authprivate
		} = req.headers
		const {
			wpm,
			netwpm,
			text,
			words,
			progressWords,
			incorrectWords,
			accuracy,
			startTime,
			timeElapsed,
			stats
		} = req.body
		try {
			await schema.validate({
				authprivate,
				authpublic,
				wpm,
				netwpm,
				text,
				incorrectWords,
				accuracy
			})
			if(!words || !progressWords || !startTime || !timeElapsed || !stats)
				return next(new Error("Missing necessary fields to submit the score."))
			const userAccount = await checkUser(authprivate, authpublic)

			const newMatch = new matchSchema()
			newMatch.owner = userAccount._id
			newMatch.text = text
			newMatch.textinArray = words
			newMatch.wpm = {
				grosswpm : wpm,
				netwpm
			}
			newMatch.mistakes = [incorrectWords, accuracy]
			newMatch.data1 = stats
			newMatch.data2 = progressWords
			newMatch.time = [startTime, timeElapsed]
			await newMatch.save()
			userAccount.matchesId.push(newMatch._id)
			if(wpm > userAccount.personalBest)
				userAccount.personalBest = wpm
			await userAccount.save()
		 	return res.send({
		 		success : true,
		 		message : 'Successfully submitted the match'
		 	})
		} catch (err)
		{
			return next(err)
		}
	})
}