import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {

    const productId = props.match.params.id;
    const [ quantity, setQuantity ] = useState(1);
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    function addToCardHandler() {
        props.history.push(`/sepet/${productId}?quantity=${quantity}`);
    }

    return (
        <div>
          {loading 
          ? <LoadingBox></LoadingBox> 
          : error 
          ? <MessageBox variant="danger">{error}</MessageBox> 
          : <div>
                <Link to='/' >Ürünlere Geri Dön</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating 
                                    rating={product.rating} 
                                    numReviews={product.numReviews}
                                />
                            </li>
                            <li>
                                Fiyat: {product.price} TL
                            </li>
                            <li>
                                {product.description}
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Fiyat</div>
                                        <div className="price">{product.price} TL</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Stok durumu</div>
                                        <div>{product.countInStock > 0 
                                                ? <span className="success">Stokta Var</span> 
                                                : <span className="danger">Stokta yok</span>}
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Adet</div>
                                                <div>
                                                    <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((x) => {
                                                            return <option key={x+1} value={x+1}>{x+1}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={addToCardHandler} className="primary block">Sepete Ekle</button>
                                        </li>
                                    </>
                                    
                                )}
                                
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
