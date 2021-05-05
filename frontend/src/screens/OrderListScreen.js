import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    function deleteHandler(order) {
        if (window.confirm(`${order.user.name} isimli siparişi silmek istediğinizden eminmisiniz?`)) {
            dispatch(deleteOrder(order._id));
        } 
    };

    return (
        <div>
            <h1>Siparişler</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox></MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>KULLANICI</th>
                                <th>TARİH</th>
                                <th>TOPLAM</th>
                                <th>ÖDENDİ Mİ?</th>
                                <th>GÖNDERİLDİ Mİ?</th>
                                <th>HAREKETLER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => {
                                  return  <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 'Hayır'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'Hayır'}</td>
                                            <td>
                                                <button type="button" onClick={() => props.history.push(`/order/${order._id}`)}>Detaylar</button>
                                                <button type="button" className="small" onClick={() => deleteHandler(order)}>Sil</button>
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
