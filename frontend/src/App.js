import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {useDispatch} from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
//import En from './Components/En';
//import Tr from './Components/Tr';
import './App.css';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import { useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.cartItems);
  const numberOfItemsInCart = cartItems.length;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  
  function signoutHandler() {
      dispatch(signout());
      window.location.reload();
  }

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">beddo™</Link>
            </div>
            <div>
                <Link to="/sepet">Sepet {numberOfItemsInCart > 0 && <span className="badge">{numberOfItemsInCart}</span>}</Link>
                {
                  userInfo ? 
                  <div className="dropdown">
                    <Link to='#'>
                      {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                    </Link> 
                    <ul className="dropdown-content">
                      <li>
                        <Link to='/profile'>
                          Kullanıcı profili
                        </Link>
                      </li>
                      <li>
                        <Link to='/orderhistory'>
                          Sipariş geçmişi
                        </Link>
                      </li>
                      <li>
                        <Link to='#signout' onClick={signoutHandler}>
                          Çıkış yap
                        </Link>
                      </li>
                    </ul>
                  </div>
                  : <Link to="/signin">Sign in</Link>
                }
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to='#admin'>Admin {' '} <i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Yönetim Paneli</Link>
                      </li>
                      <li>
                        <Link to="/productlist">Ürünler</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Siparişler</Link>
                      </li>
                      <li>
                        <Link to="/userlist">Kullanıcılar</Link>
                      </li>
                    </ul>
                  </div>
                )}
            </div>
        </header>
        <main>
            <Route path='/sepet/:id?' component={CartScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/product/:id/edit' component={ProductEditScreen} />
            <Route path='/signin' component={SignInScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/shipping' component={ShippingAddressScreen} />
            <Route path='/payment' component={PaymentMethodScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/orderhistory' component={OrderHistoryScreen} />
            <PrivateRoute path='/profile' component={ProfileScreen} />
            <AdminRoute path='/productlist' component={ProductListScreen} />
            <AdminRoute path='/orderlist' component={OrderListScreen} />
            <Route exact path='/' component={HomeScreen} />
        </main>
        <footer className="row center">
            Tüm hakları saklıdır.
        </footer>
      </div>
    </Router>
  );
}

export default App;