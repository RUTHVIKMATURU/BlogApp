import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useClerk, useUser} from'@clerk/clerk-react'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
function Header() {
  const {signOut}=useClerk()
  const {currentUser,setcurrentUser}=useContext(userAuthorContextObj)
  const navigate=useNavigate()
  const {isSignedIn,user,isLoaded}=useUser();
  async function handleSignout(){
    await signOut();
    setcurrentUser(null)
    localStorage.setItem('currentuser',JSON.stringify(null))
    navigate('/')
  }
  return (
    <div>
      <nav className='header  d-flex align-items-center justify-content-between bg-dark '>
        <div>
          <Link to='/' className='link '>
            <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt=""  width="50px" className='ms-3 rounded-1'/>
          </Link>
        </div>
        <ul className='d-flex justify-content-around gap-5 list-unstyled header-links'>
          {
            !isSignedIn ?
            <>
            <li>
            <Link to='' className='link'>Home</Link>
            </li>
            <li>
              <Link to='signin' className='link'>Signin</Link>
            </li>
            <li>
              <Link to='signup' className='link'>Signup</Link>
            </li>
          </>:
            <div className=' d-flex justify-content-between gap-2 user-button'>
              <div>
                <div style={{position:'relative'}} className='text-center'>
                  <img src={user.imageUrl} width="35px" alt="" className='rounded-circle' style={{position:'absolute',left:"-40px",top:"14px"}}/>
                  <p className='role text-light  bg-warning px-1 rounded-5' style={{position:'absolute',fontSize:"14px",right:"-25px"}}>{currentUser?.role}</p>
                </div>
              </div>
              <button className="signout btn text-light fs-4" onClick={handleSignout} >SignOut</button>
            </div>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header