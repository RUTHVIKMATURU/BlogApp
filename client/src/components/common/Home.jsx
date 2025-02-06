import {useContext,useEffect, useState} from 'react'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import {useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Home() {
  const {currentUser,setcurrentUser}=useContext(userAuthorContextObj)
  const {isSignedIn,user,isLoaded}=useUser();
  console.log("isSignIn: ",isSignedIn,"user:",user,"IsLoaded:",isLoaded)
  const [err,seterr]=useState("")
  const navigate=useNavigate()
  
  async function onSelectRole(e){
    const selectedRole=e.target.value;
    console.log(selectedRole)
    currentUser.role=selectedRole;
    let res=null;
    if(selectedRole=='author'){
      res=await axios.post('http://localhost:3000/author-api/author',currentUser)
      let {message,pavload}=res.data
      if (message=='author'){
        setcurrentUser({
          ...currentUser,
          ...pavload
        })
        seterr("")
      }else{
        seterr("Invalid Role")
      }
    }
    if(selectedRole=='user'){
      res=await axios.post('http://localhost:3000/user-api/user',currentUser)
      let {message,pavload}=res.data
      if (message=='user'){
        setcurrentUser({
          ...currentUser,
          ...pavload
        })
        seterr("")
      }else{
        seterr("Invalid Role")
      }
    }
  }
  useEffect(()=>{
    setcurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  },[isLoaded])
  
  useEffect(()=>{
    if (currentUser.role=='user'&&err.length==0){
      navigate(`/user-profile/${currentUser.email}`)
    }
    if (currentUser.role=='author'&&err.length==0){
      navigate(`/author-profile/${currentUser.email}`)
    }
  },[currentUser?.role])

  return (
    <div>
      {
        isSignedIn==false?
        <div className='container'>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint voluptatum quibusdam rerum labore explicabo aliquam possimus perferendis, nam maiores totam eum rem quam exercitationem esse asperiores distinctio laboriosam porro ullam cupiditate qui! Autem voluptatem itaque repellat cupiditate sequi commodi quia quam ea, in eius, voluptatibus deleniti, assumenda non laudantium.</p>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint voluptatum quibusdam rerum labore explicabo aliquam possimus perferendis, nam maiores totam eum rem quam exercitationem esse asperiores distinctio laboriosam porro ullam cupiditate qui! Autem voluptatem itaque repellat cupiditate sequi commodi quia quam ea, in eius, voluptatibus deleniti, assumenda non laudantium.</p>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint voluptatum quibusdam rerum labore explicabo aliquam possimus perferendis, nam maiores totam eum rem quam exercitationem esse asperiores distinctio laboriosam porro ullam cupiditate qui! Autem voluptatem itaque repellat cupiditate sequi commodi quia quam ea, in eius, voluptatibus deleniti, assumenda non laudantium.</p>
        </div>:
        <div>
          <div className='rounded-5 container d-flex justify-content-evenly text-light align-items-center bg-primary p-5'>
            <img src={user?.imageUrl} width="120px" className='rounded-circle' alt="" />
            <div>
              <p className='display-6'>{user?.firstName}</p>
              <p>{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
          {
            err.length!=0&&(<p className='container mt-3 text-danger fs-5'>*{err}</p>)
          }
          <p className="container lead display-6">Select Role</p>
          <div className='container justify-content-center rounded-3 d-flex text-light justify-content-center gap-5 role-radio mt-2 p-3' style={{backgroundColor:"grey"}}>
         
            <div className="form-check me-4">
              <input type="radio" name="role" value="author" id="author" className="form-check-input"  onChange={onSelectRole}/>
              <label htmlFor="author" className='form-check-label'>Author</label>
            </div>
            <div className="form-check me-4">
              <input type="radio" name="role" id="user"  value="user" className="form-check-input" onChange={onSelectRole}/>
              <label htmlFor="user" className='form-check-label'>User</label>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home