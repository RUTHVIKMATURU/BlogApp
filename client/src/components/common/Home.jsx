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


  async function onSelectRole(e) {
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser)
        let { message, payload } = res.data;
        if(payload.isBlock===false){
          if (message === 'author') {
            setcurrentUser({ ...currentUser, ...payload })
            
            setError('')
          } else {
            setError("INVALID ROLE");
          }
        }else{
          alert("Your account is blocked contact admin")
          setError("Your account is blocked contact admin")
        }
      }
      
      if (selectedRole === 'user') {
        res = await axios.post('http://localhost:3000/user-api/user', currentUser)
        let { message, payload } = res.data;
        if(payload.isBlock===false){
          if (message === 'user') {
            setcurrentUser({ ...currentUser, ...payload })
            
            setError('')
          } else {
            setError("INVALID ROLE");
          }
        }else{
          alert("Your account is blocked contact admin")
          setError("Your account is blocked contact admin")
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post('http://localhost:3000/admin-api/admin', currentUser)
        let { message, payload } = res.data;
          if (message === 'admin') {
            setcurrentUser({ ...currentUser, ...payload })
            
            setError('')
          } else {
            setError("INVALID ROLE");
          }
      }
      localStorage.setItem('currentuser',JSON.stringify(currentUser))
    } catch (err) {
      setError("INVALID ROLE");
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
      localStorage.setItem('currentuser',JSON.stringify(currentUser))
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && currentUser?.isBlock=== false && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && currentUser?.isBlock=== false && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && currentUser?.isBlock=== false && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }

  }, [currentUser]);

  // console.log("cu",currentUser)
  //console.log("is loaded",isLoaded)

  return (
    <div className='container'>
      {
        isSignedIn === false && <div className='d-flex flex-wrap justify-content-between'>
          <img src="https://www.figma.com/community/resource/5ea432cf-35bb-4c43-9f73-fb61c008e831/thumbnail" alt="" className='w-50'/>
          <div className="w-50 p-2 home">
            <p className='lead' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi reiciendis atque voluptate labore possimus rerum blanditiis aspernatur sit aut error, sed consequatur necessitatibus odio neque facere fugiat ullam dolorem quas perferendis deleniti ab tempore. Corporis, non, ullam, veniam sed dolorem impedit nihil repudiandae expedita molestiae mollitia placeat obcaecati pariatur libero.</p>
            <div className='d-flex justify-content-center gap-5'>
            <button className="btn btn-secondary px-4 py-2 rounded-5" onClick={()=>{navigate("/signin")}}>Get Started</button>
            <button className="btn btn-warning px-4 py-2 rounded-5" onClick={()=>{navigate("/signin")}}>About</button>
            </div>
          </div>

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
          <p className="lead text-center">Select role</p>
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