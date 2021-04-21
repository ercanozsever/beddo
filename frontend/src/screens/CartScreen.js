import React from 'react'

export default function CartScreen(props) {

    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    return (
        <div>
            <h1>Alışveriş Sepeti Sayfası</h1>
            <p>Sepete Ekle Product ID: {productId} Adet: {quantity}</p>
        </div>
    )
};
