
export const convertToEnum = (valueInput: string) => {
	if (valueInput === '1') return 'HOMEWIN'
	if (valueInput === 'X') return 'DRAW'
	if (valueInput === '2') return 'AWAYWIN'
}
export const convertEnum = (enumInput: string) => {
	if (enumInput === 'HOMEWIN') return '1'
	if (enumInput === 'DRAW') return 'X'
	if (enumInput === 'AWAYWIN') return '2'
}
export const convertEnumToTeamName = (enumInput: string, away: string, home: string) => {
	if (enumInput === 'HOMEWIN') return away
	if (enumInput === 'DRAW') return 'Draw'
	if (enumInput === 'AWAYWIN') return home
}

export const isEventFinished = (eventDate: Date) => {
	const today = new Date()
	if (eventDate > today) return false
	return true
}