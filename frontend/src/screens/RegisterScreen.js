import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Girdiğiniz şifreler aynı değil.')
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Bir Hesap Oluşturun</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">İsminiz</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="İsminizi giriniz"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Eposta adresiniz</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Eposta adresi giriniz"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Şifreniz</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Şifrenizi giriniz"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Şifrenizi tekrar giriniz</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Şifrenizi tekrar giriniz"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Kayıt ol</button>
                </div>
                <div>
                    <label />
                    <div>
                        Zaten bir hesabınız var mı? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Giriş yapın</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
