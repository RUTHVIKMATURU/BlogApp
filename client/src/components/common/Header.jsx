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
    navigate('/')
  }
  return (
    <div>
      <nav className='header d-flex align-items-center justify-content-between bg-dark '>
        <div className="d-flex justify-content-center">
          <Link to='/' className='link'>
            LOGO
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
              <div style={{position:'relative'}}>
                <img src={user.imageUrl} width="40px" alt="" className='rounded-circle'/>
                <p className='role text-light' style={{position:'absolute',fontSize:"14px",top:'-7px',right:"-25px"}}>{currentUser.role}</p>
              </div>
              <p className="ms-3 user-name">{user.firstName}</p>
              <button className="btn btn-danger signout-btn" onClick={handleSignout}>SignOut</button>
            </div>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header