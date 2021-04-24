import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Giriş yap</div>
            <div className={props.step2 ? 'active' : ''}>Sipariş bilgileri</div>
            <div className={props.step3 ? 'active' : ''}>Ödeme</div>
            <div className={props.step4 ? 'active' : ''}>Siparişi tamamla</div>
        </div>
    );
};
