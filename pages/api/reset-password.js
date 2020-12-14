/* eslint-disable quotes */
import { query as q } from 'faunadb'
import { guestClient } from '@/utils/fauna-client'
// import { getAuthCookie } from '@/utils/auth-cookies'
import { v4 as uuid } from 'uuid'
import sgMail from '@sendgrid/mail'

export default async function reset(req, res) {

	const { email } = req.body


	try {
		const existingEmail = await guestClient.query(
			q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))
		)
		if (!existingEmail) {
			return res.status(400).send(`Email ${email} not found`)
		}
		const id = uuid()

		const user = await guestClient.query(
			q.Create(q.Collection('ResetRequest'), {
				data: { email, token: id },
			})
		)
		sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API)
		const link = 'https://sports-fauna.vercel.app/reset/' + id
		if (user) {
			const msg = {
				to: email,
				from: 'frisk@hey.com',
				subject: 'Reset your password for Sport Guesser',
				html: [
					`Hello,`,
					``,
					`somebody requested a reset of your password.`,
					`Click the link below to reset it:`,
					`<a href="${link}">${link}</a>`,
					``,
					`Have a nice day`,
				].join('\n'),
			}
			sgMail
				.send(msg)
				.then(() => console.log('Email sent'))
				.catch(err => console.error(err))
			return res.status(200).end() 
		}
		
		
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}