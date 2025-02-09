import {useEffect, useState} from 'react'
import axios from 'axios'
function AdminProfile() {
  let [usersAuthors,setUsersAuthors]=useState([])
  async function getallusersauthors() {
    let res=await axios.get('http://localhost:3000/admin-api/userauthors')
    if(res.data.message==='users and authors'){
      setUsersAuthors(res.data.payload)
      console.log(res.data.payload.isblock)
    }
  }
  async function handleblock(user){
    let userAuthorIndex=usersAuthors.findIndex((userObj)=>userObj._id===user._id)
    if (userAuthorIndex !== -1) {
      let updatedUsersAuthors = [...usersAuthors];
      usersAuthors[userAuthorIndex].isBlock = !updatedUsersAuthors[userAuthorIndex].isBlock;
      setUsersAuthors(updatedUsersAuthors);
      let res =await axios.put('http://localhost:3000/admin-api/userauthor',updatedUsersAuthors[userAuthorIndex])
      console.log(res.data)
      if(res.data.message=='user updated'){
        console.log(res.data.payload)
      }
    }
  }
  useEffect(()=>{
    getallusersauthors()
  },[])
  return (
    <div className='container'>
      {
        usersAuthors.length!=0&&<div className='d-flex justify-content-between'>
          {
            usersAuthors.map((userAuthorObj)=>(
              <div key={userAuthorObj._id} className='bg-info p-3 rounded-2' style={{height:"300px"}}>
                <img src={userAuthorObj.profileImageUrl} width="50px" alt="" className='rounded-circle' />
                <p  className="lead">First Name : <b>{userAuthorObj.firstName}</b></p>
                <p  className="lead">Last Name : <b>{userAuthorObj.lastName}</b></p>
                <p className="lead"><b>{userAuthorObj.email}</b></p>
                <p className="lead">Role : <b>{userAuthorObj.role} </b></p>
                {
                  userAuthorObj.isBlock === false?(
                  <button className="btn btn-danger" onClick={()=>handleblock(userAuthorObj)}>Unblock</button>):
                  (<button className="btn btn-success" onClick={()=>handleblock(userAuthorObj)}>Block</button>

                  )}
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default AdminProfile