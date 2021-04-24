import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';



export default function ShippingAddressScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    
    useEffect(() => {
        if(!userInfo) {
            props.history.push('/signin');
        }
    })

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');


    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
    };
    
    return (  
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sipariş Bilgilerinizi Giriniz</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>İsim ve soy isminiz:</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="İsim ve soy isminizi giriniz."
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor='address'>Adresiniz:</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Adresinizi giriniz."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor='city'>Şehir:</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Şehrinizi giriniz."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor='postalCode'>Posta kodunuz:</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Posta kodunuzu giriniz."
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor='country'>Ülkeniz:</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Ülkenizi giriniz."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Devam et
                    </button>
                </div>
            </form>
        </div>
    )
}