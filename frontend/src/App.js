import React from 'react';
import data from './data';
//import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
//import En from './Components/En';
//import Tr from './Components/Tr';
import './App.css';

function App() {

  console.log(data.products);

  return (
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
          <div className="row center">
            {data.products.map((product) => {
               return <div key={product._id} className="card">
                        <a href="product.html">
                            <img className="medium" src={product.image} alt={product.name} /> 
                        </a>
                        <div className="card-body">
                            <a href={`/product/${product.name}/${product._id}`}>
                                <h2>{product.name}</h2>
                            </a>
                            <div className="rating">
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star"></i></span>
                                <span><i className="fa fa-star-half-o"></i></span>
                            </div>
                            <div className="price">
                                {product.price} TL
                            </div>
                        </div>
                      </div>
            })}
          </div>
      </main>
      <footer className="row center">
          Tüm hakları saklıdır.
      </footer>
  </div>
  );
}

export default App;