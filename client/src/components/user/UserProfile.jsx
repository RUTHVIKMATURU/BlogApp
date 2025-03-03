import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


function UserProfile() {
  return (
    <div>
      <ul className='d-flex justify-content-center list-unstyled fs-3'>
          <li>
            <NavLink to='articles' className="nav-link btn rounded-5 px-4 bg-info">Articles</NavLink>
          </li>
      </ul>
      <div className='mt-5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserProfile