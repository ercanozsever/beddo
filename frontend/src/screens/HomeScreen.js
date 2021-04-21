import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productsActions';

export default function HomeScreen() {

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

    return (
        <div>
          {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> 
          : <div className="row center">
              {products.map((product) => {
                return <Product key={product._id} product={product} />
              })}
            </div>}
        </div>
    );
};
