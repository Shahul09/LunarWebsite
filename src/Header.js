import React, { useState }from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase'

function Header() {

  const [{ basket, user }, dispatch] = useStateValue();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleAuthentication= () => {
    if (user) { 
      auth.signOut();
      dispatch({
        type: 'SET_USER',
        user: null, // Reset user state
      });
       
    }
  };

  const handleSearch = () => {
    navigate(`/?search=${searchInput}`);
  };

  return (
    <div className='header'>
      <Link to='/'>
       <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB81mu4GyyRPDcGDU3i9B7rKo47icRPsLa5g&s'className='header_logo' />
      </Link>
     
      <div className='header_search'>
        <input
          className='header_searchInput'
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon className='header_searchicon' onClick={handleSearch} />
      </div>
     
     <div className='header_nav'>
       <Link to={!user && '/login'} >
       <div onClick={handleAuthentication} className='header_option'>
         <span className='header_optionlineone' >
           {user ? `Hello, ${user.email}` : 'Hello Guest'}
         </span>
         <span className='header_optionlinetwo' >
          {user ? 'Sign-out' : 'Sign-in'}
         </span>
       </div>
      </Link>
       
       <Link to='/Orders'>
       <div className='header_option'>
        <span className='header_optionlineone' >
          Return
         </span>
         <span className='header_optionlinetwo' >
          & Oreders
         </span>
       </div>
       </Link>
       
       <Link to={'/'}>
       <div className='header_option'>
         <span className='header_optionlineone' >
           You Landed
         </span>
         <span className='header_optionlinetwo' >
          On Lunar
         </span>
       </div>
       </Link>
        
       <Link to='/checkout'>
          <div className='header_optionbasket'>
            <ShoppingCartIcon />
            <span className='header_optionlinetwo header_basketcount'>
              {basket?.length}
            </span>
          </div>
       </Link>
     </div>
      
    </div>
  )
}

export default Header
