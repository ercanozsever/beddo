import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts());
    }, [dispatch, successCreate, props.history, createdProduct, successDelete]);

    function deleteHandler(product) {
        if (window.confirm(`${product.name} isimli ürünü silmek istediğinizden emin misiniz?`)) {
            dispatch(deleteProduct(product._id));
        }
    }

    function createHandler() {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className="row">
                <h1>Ürünler</h1>
                <button 
                    type="button" 
                    className="primary"
                    onClick={createHandler}
                >
                    Ürün Ekle
                </button>
            </div>   
        
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {
            loading ? <LoadingBox></LoadingBox> : 
            error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ürün ismi</th>
                            <th>Fiyat</th>
                            <th>Kategori</th>
                            <th>Marka</th>
                            <th>Hareketler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => {
                                return <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="small" 
                                                    onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                                >
                                                    Düzenle
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="small" 
                                                    onClick={() => deleteHandler(product)}
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                       </tr>
                            })
                        }
                    </tbody>
                </table>
            )
        }
        </div>
    )
}
