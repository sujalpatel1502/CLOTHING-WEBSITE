import { createContext, useState, useEffect} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //signOutUser();

  useEffect (() =>{
    const unsubscribe = onAuthStateChangedListener((user) => {
      //console.log(user);
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};