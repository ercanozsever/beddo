import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {

    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();

    console.log(orders);

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div>
            <h1>Sipariş Geçmişi</h1>
            {
                loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 'Hayır'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'Hayır'}</td>
                                            <td>
                                                <button type="button" onClick={() => props.history.push(`/order/${order._id}`)}>Detaylar</button>
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
};
