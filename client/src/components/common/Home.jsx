import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { currentUser, setcurrentUser } = useContext(userAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log("isSignedIn :", isSignedIn)
   console.log("User :", user)
  // console.log("isLolded :", isLoaded)



  async function onSelectRole(e) {
    //clear error property
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser)
        let { message, payload } = res.data;
        // console.log(message, payload)
        if(payload.isBlock===true){
          if (message === 'author') {
            setcurrentUser({ ...currentUser, ...payload })
            // setError(null)
          } else {
            setError(message);
          }
          setError('')
        }else{
          setError("Your account is blocked contact admin")
        }
      }
      
      if (selectedRole === 'user') {
        res = await axios.post('http://localhost:3000/user-api/user', currentUser)
        let { message, payload } = res.data;
        if(payload.isBlock===true){
          if (message === 'user') {
            setcurrentUser({ ...currentUser, ...payload })
          } else {
            setError(message);
          }
          setError('')
        }else{
          setError("Your account is blocked contact admin")
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post('http://localhost:3000/admin-api/admin', currentUser)
        let { message, payload } = res.data;
          if (message === 'admin') {
            setcurrentUser({ ...currentUser, ...payload })
          } else {
            setError(message);
          }
          setError('')
      }
    } catch (err) {
      setError(err.message);
    }
  }


  useEffect(() => {
    if (isSignedIn === true) {
      setcurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }

  }, [currentUser]);

  // console.log("cu",currentUser)
  //console.log("is loaded",isLoaded)

  return (
    <div className='container'>
      {
        isSignedIn === false && <div>
          <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>
          <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>
          <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam neque consequatur nemo, enim expedita alias nobis iste obcaecati, eum dolor deserunt voluptatum odio aperiam, officiis sequi voluptates molestias atque sint?</p>

        </div>
      }

      {
        isSignedIn === true &&
        <div>
          <div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
            <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
            <p className="display-6">{user.firstName}</p>
            <p className="lead">{user.emailAddresses[0].emailAddress}</p>
          </div>
          <p className="lead">Select role</p>
          {error.length !== 0 && (
            <p
              className="text-danger fs-5"
              style={{ fontFamily: "sans-serif" }}
            >
              {error}
            </p>
          )}
          <div className='d-flex role-radio py-3 justify-content-center'>

            <div className="form-check me-4">
              <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="author" className="form-check-label">Author</label>
            </div>
            <div className="form-check me-4">
              <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
            <div className="form-check me-4">
              <input type="radio" name="role" id="admin" value="admin" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="admin" className="form-check-label">Admin</label>
            </div>
          </div>
        </div>



      }
    </div>
  )
}

export default Home