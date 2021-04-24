import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function CartScreen(props) {

    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity]);

    function removeFromCartHandler(productId) {
        dispatch(removeFromCart(productId));
        if (`/sepet/${props.match.params.id}`) {
            props.history.push('/sepet')
        }
    }

    function checkoutHandler() {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Alışveriş Sepetiniz</h1>
                {cartItems.length === 0 
                    ? <MessageBox>Alışveriş Sepetiniz Boş <Link to='/'>Ürünlere Gözatın</Link></MessageBox>
                    : <ul>
                        {cartItems.map((item) => {
                            return <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name} />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select 
                                                    value={item.quantity} 
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => {
                                                    return <option key={x+1} value={x+1}>{x+1}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                {item.price} TL
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                    Sil
                                                </button>
                                            </div>
                                        </div>
                                   </li>
                                
                        })}
                    </ul>
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Ara toplam ({cartItems.reduce((a, c) => a + c.quantity, 0)} Adet) 
                                : ({cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} TL)
                            </h2>
                        </li>
                        <li>
                            <button type="button" 
                                    onClick={checkoutHandler}
                                    className="primary block"
                                    disabled={cartItems.length === 0}>
                                Alışverişi Tamamla
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
