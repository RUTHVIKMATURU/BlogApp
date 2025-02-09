import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'

function Articles() {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const navigate=useNavigate()
  const {getToken}=useAuth();
  const {currentUser}=useContext(userAuthorContextObj)
  const [categoryArticles,setCategoryArticles]=useState([])
  const [category,setCategory]=useState('')
  //get all articles
  async function getArticles() {
    //get jwt token
    const token=await getToken()
    //make authenticated req
    if (currentUser.role=='user'){
      let response = await axios.get('http://localhost:3000/user-api/articles',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if (response.data.message === 'articles') {
        setArticles(response.data.payload)
        setError('')
      } else {
        setError(response.data.message)
      }
    }else if(currentUser.role=='author'){
      let res = await axios.get('http://localhost:3000/author-api/articles',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if (res.data.message === 'articles') {
        setArticles(res.data.payload)
        setError('')
      } else {
        setError(res.data.message)
      }
    }
    
    
  }

  //goto specific article
  function gotoArticleById(articleObj){
      navigate(`../${articleObj.articleId}`,{ state:articleObj})
  }
  function handlecategoryselect(e){
    let value =e.target.value;
    setCategory(value)
    let res=articles.filter((articleObj)=>articleObj.category === value)
    setCategoryArticles(res)
  }

  useEffect(() => {
    getArticles()
    console.log(categoryArticles)
  }, [])

  return (
    <div className='container'>
      <div className="dropdown-container">
    <h1>Select the Category</h1>
    <div className="custom-dropdown w-50">
      <select
        id="category"
        className="form-control mb-3 custom-select"
        onChange={handlecategoryselect}
      >
        <option value="" selected disabled>Select Category</option>
        <option value="programming">Programming</option>
        <option value="AI&ML">AIML</option>
        <option value="database">Database</option>
      </select>

    </div>
  </div>

      
      {error.length!==0&&<p className='display-4 text-center mt-5 text-danger'>{error}</p>}
        {
          categoryArticles.length===0&&category.length!=0&&<h1>No articles with category {category}</h1>
        }
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 '>
          {
            categoryArticles.map((articleObj) => <div className='col mb-2' key={articleObj.articleId}>
              <div className="card h-100">
                <div className="card-body">
                {/* author image  */}
                  <div className="author-details text-end">
                    <img src={articleObj.authorData.profileImageUrl}
                      width='40px'
                      className='rounded-circle'
                      alt="" />
                    {/* author name */}
                    <p>
                      <small className='text-secondary'>
                        {articleObj.authorData.nameOfAuthor}
                      </small>
                    </p>
                  </div>
                  {/* article title */}
                  <h5 className='card-title'>{articleObj.title}</h5>
                  {/* article content upadto 80 chars */}
                  <p className='card-text'>
                    {articleObj.content.substring(0, 80) + "...."}
                  </p>
                  {/* read more button */}
                  <button className='btn btn-primary' onClick={()=>gotoArticleById(articleObj)}>
                    Read more
                  </button>
                </div>
                <div className="card-footer">
                {/* article's date of modification */}
                  <small className="text-body-secondary">
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
            )
          }
        </div>
      
    </div>
  )
}

export default Articles