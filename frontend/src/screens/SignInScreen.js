import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(signin(email, password));
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
                    <h1>Giriş Yap</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                    <label />
                    <button className="primary" type="submit">Giriş Yap</button>
                </div>
                <div>
                    <label />
                    <div>
                        Hesabınız yok mu? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Hesap oluşturun</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
