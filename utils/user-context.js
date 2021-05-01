import { createContext, useState } from 'react';
import { auth } from './firebase';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(() => auth.currentUser);
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser.uid);

      setUserID({ id: firebaseUser.uid, username: firebaseUser.displayName });
    } else {
      console.log('no user found');
    }
  });
  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
