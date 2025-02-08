import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


function AuthorProfile() {
  return (
    <div >
      <ul className='d-flex justify-content-around list-unstyled fs-3'>
        <li>
          <NavLink to='articles' className="nav-link btn btn-primary py-2 px-4 rounded-5 ">Articles</NavLink>
        </li>
        <li>
          <NavLink to='article' className="nav-link  btn btn-info py-2 px-4 rounded-5 ">Add new Article</NavLink>
        </li>
      </ul>
      <div className='mt-5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile