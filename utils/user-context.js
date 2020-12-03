import { createContext, useState } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
	const [userID, setUserID] = useState('testid')
	return (
		<UserContext.Provider value={{userID, setUserID}}>
			{children}
		</UserContext.Provider>
	)

}

export { UserContextProvider, UserContext }