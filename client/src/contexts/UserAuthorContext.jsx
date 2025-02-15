import {createContext,useEffect,useState} from 'react'
export const userAuthorContextObj=createContext();

function UserAuthorContext({children}) {
  let [currentUser,setcurrentUser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    profileImageUrl:"",
    role:""
})
useEffect(()=>{
  setcurrentUser(JSON.parse(localStorage.getItem('currentuser')))
},[])
  return (
    <userAuthorContextObj.Provider value={{currentUser,setcurrentUser}}>
      {children}
    </userAuthorContextObj.Provider>
  )
}

export default UserAuthorContext