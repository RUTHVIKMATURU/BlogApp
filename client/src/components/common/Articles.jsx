import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';

function Articles() {
  const [articles, setArticles] = useState(JSON.parse(localStorage.getItem('articles')) || []);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { currentUser } = useContext(userAuthorContextObj);
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [category, setCategory] = useState('');

  async function getArticles() {
    const token = await getToken();
    let response;
    if (currentUser.role === 'user') {
      response = await axios.get('http://localhost:3000/user-api/articles', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else if (currentUser.role === 'author') {
      response = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    if (response?.data.message === 'articles') {
      setArticles(response.data.payload);
      localStorage.setItem('articles', JSON.stringify(response.data.payload));
      setError('');
    } else {
      setError(response?.data.message || 'Error fetching articles');
    }
  }

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  function handleCategorySelect(e) {
    setCategory(e.target.value);
  }

  useEffect(() => {
    if (!articles.length) getArticles();
  }, []);

  useEffect(() => {
    if(category=='ALL'){
      setCategoryArticles(articles);
    }else{
    setCategoryArticles(category ? articles.filter(a => a.category === category) : articles);
    }
  }, [articles, category]);

  return (
    <div className='container'>
      <div className='dropdown-container'>
        <h1>Select the Category</h1>
        <select className='form-control mb-3' onChange={handleCategorySelect}>
          <option value='' selected disabled>Select Category</option>
          <option value="ALL">All Articles</option>
          <option value='programming'>Programming</option>
          <option value='AI&ML'>AI & ML</option>
          <option value='database'>Database</option>
        </select>
      </div>
      {error && <p className='text-danger text-center'>{error}</p>}
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
        {categoryArticles.map(articleObj => (
          <div className='col mb-2' key={articleObj.articleId}>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='text-end'>
                  <img src={articleObj.authorData.profileImageUrl} width='40' className='rounded-circle' alt='' />
                  <p><small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small></p>
                </div>
                <h5 className='card-title'>{articleObj.title}</h5>
                <p className='card-text'>{articleObj.content.substring(0, 80)}...</p>
                <button className='btn btn-primary' onClick={() => gotoArticleById(articleObj)}>Read more</button>
              </div>
              <div className='card-footer'>
                <small className='text-body-secondary'>Last updated on {articleObj.dateOfModification}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
