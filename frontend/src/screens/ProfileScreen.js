import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo]);

    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        Kullanıcı Profili
                    </h1>
                </div>
                {
                    loading ? (<LoadingBox></LoadingBox>) : 
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    <>
                        <div>
                            <label htmlFor="name">İsim</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="İsminizi giriniz" 
                                defaultValue={user.name}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">E-posta</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="E-posta adresinizi giriniz" 
                                defaultValue={user.email}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Şifre</label>
                            <input 
                                id="passord" 
                                type="password" 
                                placeholder="Şifrenizi giriniz" 
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmpassword">Tekrar Şifre</label>
                            <input 
                                id="confirmpassord" 
                                type="password" 
                                placeholder="Şifrenizi tekrar giriniz" 
                            ></input>
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit">Güncelle</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
