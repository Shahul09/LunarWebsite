import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  
  const [ { basket, user } , dispatch] = useStateValue();


  return (
    <div className='checkout'>
      <div className='checkout_left'>
         <img className='checkout_ad' src='https://www.shutterstock.com/image-photo/golden-clouds-after-sunset-on-260nw-2316353485.jpg' alt='' />
         <div>
          <h3>Hello, {user?.email}</h3>
           <h2 className='checkout_title'>Your Shopping Basket</h2>
           
           {basket.map(item => (
            <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating} />
           ))}
         </div>   
      </div>

      <div className='checkout_right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
