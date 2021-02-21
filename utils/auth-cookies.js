import { serialize, parse } from 'cookie'

const TOKEN_NAME = 'sportguess-token'
const USERTOKEN_NAME = 'sportguess-user'
const MAX_AGE = 60 * 60 * 24

export function setAuthCookie(res, token, userID, username) {
	const userNameCheck = username ? username : ''
	const cookie = serialize(TOKEN_NAME, token, {
		httpOnly: true,
		maxAge: MAX_AGE,
		path: '/',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	})

	const userCookie = serialize(USERTOKEN_NAME, userID + '|' + userNameCheck, {
		httpOnly: true,
		maxAge: MAX_AGE,
		path: '/',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	})
	res.setHeader('Set-Cookie', [cookie, userCookie])
}

export function removeAuthCookie(res) {
	const cookie = serialize(TOKEN_NAME, '', {
		maxAge: -1,
		path: '/',
	})
	const userCookie = serialize(USERTOKEN_NAME, '', {
		maxAge: -1,
		path: '/',
	})

	res.setHeader('Set-Cookie', [cookie, userCookie])
}

export function getAuthCookie(req) {
	if (req.cookies) return req.cookies[TOKEN_NAME]

	const cookies = parse(req.headers.cookie || '')
	return cookies[TOKEN_NAME]
}

export function getUserCookie(req) {
	if (req.cookies) return req.cookies[USERTOKEN_NAME]

	const cookies = parse(req.headers.cookie || '')
	return cookies[USERTOKEN_NAME]
}
