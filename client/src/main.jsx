import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import RootLayout from './components/common/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import ArticleById from './components/common/ArticleById.jsx'
import Articles from './components/common/Articles.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import UserAuthorContext from './contexts/UserAuthorContext.jsx'


const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:'signin',
        element:<Signin/>
      },
      {
        path:'signup',
        element:<Signup/>
      },
      {
        path:'user-profile/:email',
        element:<UserProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },
          {
            path:':articleId',
            element:<ArticleById/>
          },
          {
            path:'',
            element:<Navigate to='articles'/>
          }
        ]
      },
      {
        path:'author-profile/:email',
        element:<AuthorProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },
          {
            path:':articleId',
            element:<ArticleById/>
          },
          {
            path:'article',
            element:<PostArticle/>
          },
          {
            path:'',
            element:<Navigate to='articles'/>
          }
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
    <RouterProvider router={browserRouterObj}/>
    </UserAuthorContext>
  </StrictMode>,
)
