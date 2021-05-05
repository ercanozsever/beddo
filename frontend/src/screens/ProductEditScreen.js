import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {

    const productId = props.match.params.id; 

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ image, setImage ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdated } = productUpdate;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdated) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdated) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, props.history, successUpdated]);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name, 
            price, 
            image, 
            brand, 
            category, 
            countInStock, 
            description
        }));
    };

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [ loadingUpload, setLoadingUpload ] = useState(false);
    const [ errorUpload, setErrorUpload ] = useState('');

    async function uploadFileHandler(e) {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer:${userInfo.token}`}
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        {productId} Numaralı Ürünü Düzenle
                    </h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                    loading ? (<LoadingBox></LoadingBox>) : 
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                        <>
                            <div>
                                <label htmlFor="name">Ürün ismi:</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    placeholder="Ürün ismi giriniz" 
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="price">Fiyat:</label>
                                <input 
                                    id="price" 
                                    type="text" 
                                    placeholder="Fiyat giriniz" 
                                    defaultValue={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="image">Resim yolu:</label>
                                <input 
                                    id="image" 
                                    type="text" 
                                    placeholder="Resim yolu giriniz" 
                                    defaultValue={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="imageFile">Resim dosyası</label>
                                <input 
                                    id="imageFile" 
                                    type="file" 
                                    label="Resim seçiniz" 
                                    onChange={uploadFileHandler}
                                >
                                </input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                            </div>
                            <div>
                                <label htmlFor="category">Kategori ismi:</label>
                                <input 
                                    id="category" 
                                    type="text" 
                                    placeholder="Kategori ismi giriniz" 
                                    defaultValue={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">Stok giriniz:</label>
                                <input 
                                    id="countInStock" 
                                    type="text" 
                                    placeholder="Stok sayısı giriniz" 
                                    defaultValue={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="brand">Marka ismi:</label>
                                <input 
                                    id="brand" 
                                    type="text" 
                                    placeholder="Marka giriniz" 
                                    defaultValue={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >

                                </input>
                            </div>
                            <div>
                                <label htmlFor="description">Açıklama:</label>
                                <textarea 
                                    id="description" 
                                    row="3"
                                    type="text" 
                                    placeholder="Ürün açıklaması giriniz" 
                                    defaultValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="primary">Güncelle</button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    )
}
