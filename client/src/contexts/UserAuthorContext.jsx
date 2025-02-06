import {createContext,useState} from 'react'
export const userAuthorContextObj=createContext();

function UserAuthorContext({children}) {
  let [currentUser,setcurrentUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    profileImageUrl:"",
    role:""
})
  return (
    <userAuthorContextObj.Provider value={{currentUser,setcurrentUser}}>
      {children}
    </userAuthorContextObj.Provider>
  )
}

export default UserAuthorContext