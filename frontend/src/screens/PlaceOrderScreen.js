import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    useEffect(() => {
        if(!userInfo) {
            props.history.push('/signin');
        }
    })

    useEffect(() => {
        if(!cart.paymentMethod) {
            props.history.push('/payment');
        };
    })
    

    const toPrice = (num) => Number(num.toFixed(2));

    console.log(toPrice(10,51365854));

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    console.log(cart.itemsPrice);
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    function placeOrderHandler(e) {
        //TODO later
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Adres Bilgileriniz</h2>
                                <p>
                                    <strong>İsim:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Adres:</strong> 
                                        {cart.shippingAddress.address},
                                        {cart.shippingAddress.city},
                                        {cart.shippingAddress.postalCode},
                                        {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Ödeme Bilgileriniz</h2>
                                <p>
                                    <strong>Ödeme yöntemi:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sipariş kalemleriniz</h2>
                                <ul>
                                    {cart.cartItems.map((item) => {
                                        return <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img className="small" src={item.image} alt={item.name} />
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.quantity} x {item.price} TL = {item.quantity * item.price} TL
                                                        </div>
                                                    </div>
                                            </li>
                                            
                                            })}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body" >
                        <ul>
                            <li>
                                <h2>Sipariş Özetiniz</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Ürün tutarı</div>
                                    <div>{cart.itemsPrice} TL</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Kargo ücreti</div>
                                    <div>{cart.shippingPrice} TL</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Vergiler</div>
                                    <div>%8 KDV {cart.taxPrice} TL </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Toplam tutar</strong>
                                    </div>
                                    <div>
                                        <strong>{cart.totalPrice} TL</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button 
                                    className="primary block" 
                                    type="submit" 
                                    onSubmit={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Siparişi Tamamlayın
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
