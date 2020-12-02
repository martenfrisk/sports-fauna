import { createContext } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => (
	<UserContext.Provider value={'testid'}>
		{children}
	</UserContext.Provider>
)

export { UserContextProvider, Consumer as UserContextConsumer }