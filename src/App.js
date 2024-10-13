import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment';
import Orders from './Orders'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51Q4fOp2KUu8HzieKowDpv6lW9Jb1smsABgUnN3VJxxlEKxZpnz0nlldweAu03JPinDL1wyCs5XLWEdt7KiS7tQKc00sD0swmjp');

function App() {
   
  const [{}, dispatch] = useStateValue();

  useEffect( () => {
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);
      if (authUser) {
        //the user is just logged in or the user was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  const location = useLocation();

  return (
    //BEM
    
      <div className="App">
      {location.pathname !== '/login' && <Header />}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route 
          path="/payment" 
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
          />

        </Routes>
      </div>
  
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
