import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';


function Subtotal() {

  const navigate = useNavigate();

  const [{ basket }, state, dispatch] = useStateValue();

  const totalPrice = basket?.reduce((acc, item) => acc + item.price, 0) || 0;


  return (
    <div className='subtotal'>
       <CurrencyFormat
         renderText={(value) => (
            <> 
              <p>
                Subtotal ({ basket?.length } items): <strong>{value}</strong>
              </p>
              <small className='subtotal_gift'>
                <input type='checkbox' /> This order contains a subtotal_gift
              </small>
            </>
         )}
         decimalScale={2}
         value={totalPrice}
         displayType={'text'}
         thousandsSeparator={true}
         prefix={'₹'}
       />
       <button onClick={e => navigate('/payment')}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
