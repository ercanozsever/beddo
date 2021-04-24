import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    let local = localStorage.getItem('shippingAddress')
/*
    This is Basir's code, causing react render error
        if(!cart.shippingAddress.address) {
            props.history.push('/shipping');
        }
*/

    useEffect(() => {
        if(!userInfo) {
            props.history.push('/signin');
        }
        if( local === null) {
            props.history.push('/shipping');
        }
    })
  
    
    

    const [paymentMethod, setPaymentMethod] = useState('paypal');

    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Ödeme Seçenekleri</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            value="paypal"
                            name="paymentMethod"
                            required checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Devam et</button>
                </div>
            </form>
        </div>
    )
}
