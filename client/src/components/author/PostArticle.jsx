import {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
function PostArticle() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {currentUser}=useContext(userAuthorContextObj)
  const navigate=useNavigate()
  const [err,seterr]=useState()
  async function handleformsubmit(articleObj){
      //create article object as per article schema
      const authorData={
        nameOfAuthor:currentUser.firstName,
        email:currentUser.email,
        profileImageUrl:currentUser.profileImageUrl
      }
      articleObj.authorData=authorData;
      articleObj.articleId=Date.now();
      let currentDate =new Date()
      articleObj.dateOfCreation=currentDate.getDate()+"-"
                                +currentDate.getMonth()+"-"
                                +currentDate.getFullYear()+" "
                                +currentDate.toLocaleTimeString("en-US",{hour12:true})
      articleObj.dateOfModification=currentDate.getDate()+"-"
                                +currentDate.getMonth()+"-"
                                +currentDate.getFullYear()+" "
                                +currentDate.toLocaleTimeString("en-US",{hour12:true})
      articleObj.comments=[]
      articleObj.isArticleActive=true;
      console.log(articleObj)
      let res =await axios.post('http://localhost:3000/author-api/article',articleObj)
      if (res.status==201){
        navigate(`/author-profile/${currentUser.email}/articles`)
        seterr("")
      }else{
        seterr("Error occured during Posting an Article")
      }
  }
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3 " style={{ color: "goldenrod" }}>
                Write an Article
              </h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(handleformsubmit)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register('title')}

                  />
                  {/* title validation err msg */}

                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select

                    id="category"
                    className="form-select"
                    defaultValue=""
                    {...register('category')}
                  >
                    <option value="" disabled>--categories--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                  {/* title validation err msg */}

                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea

                    className="form-control"
                    id="content"
                    rows="10"
                    
                    {...register('content')}
                  ></textarea>
                  {/* title validation err msg */}

                </div>

                <div className="text-end">
                  <button type="submit" className="add-article-btn btn btn-success">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostArticle