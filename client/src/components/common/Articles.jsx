import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'

function Articles() {
  let [articles,setarticles]=useState([])
  const [error,seterror]=useState('')
  
  console.log(articles)
  const navigate=useNavigate()
  async function getArticles() {
    let res =await axios.get('http://localhost:3000/author-api/articles')
    if (res.data.message=='articles'){
      setarticles(res.data.pavload)

    }else{
      seterror(res.data.message)
    }
  }

  function gotoArticleById(articleObj){
    navigate(`../${articleObj.articleId}`,{state:articleObj})
  }
  useEffect(()=>{
    getArticles()
  },[])
  return (
    <div className='container d-flex justify-content-between  p-3 rounded-3 gap-3'>
      {
        articles.map((articleObj)=>(
          <div key={articleObj.articleId} className='bg-info p-3 rounded-3' style={{width:"250px"}}>
            <div className="card-body">
              <img src={articleObj.authorData.profileImageUrl} width="50px" alt="" className='rounded-circle' />
            </div>
            <div className="card-title">
              {articleObj.title}
            </div>
            <div className="card-text">
              {articleObj.content.substring(0,80)+"..."}
            </div>
            <div className="btn btn-primary" onClick={()=>gotoArticleById(articleObj)}>Read More</div>
          </div>
        ))
      }

    </div>
  )
}

export default Articles