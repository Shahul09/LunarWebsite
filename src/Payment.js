import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from './axios';
import { db } from './firebase'


function Payment() {
   {/* pulling from the data layer */}
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [ error, setError] = useState(null);
    const [ disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`

                })
                setClientSecret(response.data.clientSecret);
            
        }
       getClientSecret();
    }, [basket])
   
    //checking on console for working
    console.log('the secret is >>', clientSecret)
    console.log('🧑', user)

    const handleSubmit= async (e)  => {
        //fancy stripe stuff
    e.preventDefault();
    setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) => {
        //paymentIntend = payment confirmation
        //NoSQL database use
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type : 'EMPTY_BASKET'
        })

        navigate('/orders', { replace: true })
      })

    }

    const handleChange = e => {
    //listens for changes in the card element
    // and display any error as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : ""); 

    }

    return (
    <div className='payment'>

       
     <div className='payment_container'>
        <h1>
            Checkout (
                <Link to='/checkout'>{basket?.length} items </
            Link>)
        </h1>
         {/*for delivery info */}
       <div className='payment_section'>
         <div className='payment_title'>
            <h3>Delivery Address</h3>
         </div>

         <div className='payment_address'>
            <p>{user?.email}</p>
            <p>No4, Yellachenahalli</p>
            <p>Bengaluru, Karnataka</p>
         </div>
    
       </div>

         {/* for item display */}
      <div className='payment_section'>
        <div className='payment_title'>
            <h3>Review items and delivery</h3>
        </div>
        <div className='payment_items'>
            {basket.map(item => (
                <CheckoutProduct
                   id={item.id}
                   title={item.title}
                   image={item.image}
                   price={item.price}
                   rating={item.rating}
                 />
            ))}
        </div>
      </div>

        {/* for mode of payment */}
      <div className='payment_section'>
         <div className='payment_title'>
           <h3>Payment Method</h3>
          </div>
         <div className='payment_details'>
            {/* this is where the stripe magic will go */}
               <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />

                  <div className='payment_pricecontainer'>

                  <CurrencyFormat
                      renderText={(value) => (
                     <> 
                       <h3>Order Total: {value}</h3>
                    </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandsSeparator={true}
                    prefix={'₹'}
                  /> 
                  <button disabled={processing || disabled || succeeded} >
                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                  </button>
                  </div>
                  {/* error handeling */}
                  {error && <div>{error}</div>}
               </form>
         </div>
        
      </div>

     </div>
  </div>

  )
}

export default Payment;
