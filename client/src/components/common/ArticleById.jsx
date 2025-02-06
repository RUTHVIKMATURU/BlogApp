import React from 'react'
import { useLocation } from 'react-router-dom'
function ArticleById() {
  const {state}=useLocation()
  console.log(state)
  return (
    <div>
      <div className="container justify-content-between ">
        <div className='mb-5 author-block w-100 px-4 py-2 bg-info rounded-2 d-flex justify-content-between align-items-center'>
          <div>
            <p className="display-3 me-4">{state.title}</p>
            <span className='py-3'>
              <small className='text-secondary'>Created on : {state.dateOfCreation} </small>
              <small className='text-secondary'>Modified on : {state.dateOfModification} </small>
            </span>
          </div>
          <div className="author-details text-center">
            <img src={state.authorData.profileImageUrl} alt=""  width="50px" className='rounded-circle'/>
            <p>{state.authorData.nameOfUser}</p>
          </div>
        </div>
        <div className="content p-2 border border-1">{state.content}</div>
        {state.comments && state.comments.length > 0 ? (
          state.comments.map((comment, index) => (
            <div key={index}>
              <p className="lead">{comment.nameOfUser}</p>
              <p className="lead">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

export default ArticleById