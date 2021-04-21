import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import En from './Components/En';
//import Tr from './Components/Tr';
import './App.css';
import CartScreen from './screens/CartScreen';

function App() {

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">beddo™</a>
            </div>
            <div>
                <a href="/sepet">Sepet</a>
                <a href="/musteri-hizmetleri">Müşteri Hizmetleri</a>
            </div>
        </header>
        <main>
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/product/:id' component={ProductScreen} />
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