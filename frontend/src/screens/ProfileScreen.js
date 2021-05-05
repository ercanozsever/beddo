import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = userUpdateProfile;  
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        
    }, [dispatch, userInfo, user]);

    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Girdiğiniz şifreler aynı değil');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
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
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant="success">Bilgileriniz güncellendi</MessageBox>}
                        <div>
                            <label htmlFor="name">İsim</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="İsminizi giriniz" 
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">E-posta</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="E-posta adresinizi giriniz" 
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Şifre</label>
                            <input 
                                id="passord" 
                                type="password" 
                                placeholder="Şifrenizi giriniz" 
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmpassword">Tekrar Şifre</label>
                            <input 
                                id="confirmpassord" 
                                type="password" 
                                placeholder="Şifrenizi tekrar giriniz" 
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
