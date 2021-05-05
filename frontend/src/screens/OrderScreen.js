import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {

    const [ sdkReady, setSdkReady ] = useState(false);
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

    const onSuccessHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    useEffect(() => {
        if(!userInfo) {
            props.history.push('/signin');
        }
    });

    function deliverHandler() {
        dispatch(deliverOrder(order._id));
    };

    return loading ? (<LoadingBox></LoadingBox>) :
           error ? (<MessageBox variant="danger">{error}</MessageBox>) :          
    (
        <div>
            <h1>Sipariş numaranız : {order._id} </h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Adres Bilgileriniz</h2>
                                <p>
                                    <strong>İsim:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Adres:</strong> 
                                        {order.shippingAddress.address},
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (<MessageBox variant="success">{order.deliveredAt} Tarihinde gönderildi</MessageBox>) : 
                                (<MessageBox variant="danger">Henüz gönderilmedi</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Ödeme Bilgileriniz</h2>
                                <p>
                                    <strong>Ödeme yöntemi:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (<MessageBox variant="success">{order.paidAt} Tarihinde ödendi</MessageBox>) : 
                                (<MessageBox variant="danger">Ödeme tamamlanmadı</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sipariş kalemleriniz</h2>
                                <ul>
                                    {order.orderItems.map((item) => {
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
                                    <div>{order.itemsPrice} TL</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Kargo ücreti</div>
                                    <div>{order.shippingPrice} TL</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Vergiler</div>
                                    <div>%8 KDV {order.taxPrice} TL </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Toplam tutar</strong>
                                    </div>
                                    <div>
                                        <strong>{order.totalPrice} TL</strong>
                                    </div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady ? (<LoadingBox></LoadingBox>) : 
                                        <>
                                        {errorPay && <MessageBox variant="danger">{error}</MessageBox>}
                                        {loadingPay && <LoadingBox></LoadingBox>}
                                        <PayPalButton 
                                            amount={order.totalPrice} 
                                            onSuccess={onSuccessHandler} 
                                        ></PayPalButton>
                                        </>
                                        }
                                    </li>
                                )
                            }
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                        {loadingDeliver && <LoadingBox></LoadingBox>}
                                        {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                        <button className="primary block" type="button" onClick={deliverHandler}>
                                            Siparişi Kargola
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
