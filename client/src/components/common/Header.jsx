import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav className='header d-flex align-items-center justify-content-between bg-dark '>
        <div className="d-flex justify-content-center">
          <Link to='/'>
            LOGO
          </Link>
        </div>
        <ul className='d-flex justify-content-around gap-5 list-unstyled header-links'>
          <li>
            <Link to=''>Home</Link>
          </li>
          <li>
            <Link to='signin'>Signin</Link>
          </li>
          <li>
            <Link to='signup'>Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header