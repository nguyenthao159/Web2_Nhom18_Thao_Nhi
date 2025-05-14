import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './OrderDetail.css';

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('authToken');

            if (!user || !token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/public/users/${user.email}/orders/${orderId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    maxRedirects: 5, // Cho phép tối đa 5 lần chuyển hướng
                    validateStatus: function (status) {
                        return status >= 200 && status < 400; // Chấp nhận status code từ 200-399
                    }
                }
            );

            if (response.data) {
                console.log('Order details response:', response.data);
                setOrder(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Fetch order details error:', error);
            toast.error('Không thể tải chi tiết đơn hàng!');
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Đang tải...</div>;
    if (!order) return <div className="error">Không tìm thấy đơn hàng</div>;

    // Tính tổng tiền
    const totalPrice = order.orderItems.reduce((total, item) => {
        const itemPrice = item.product.specialPrice > 0 
            ? item.product.specialPrice 
            : item.product.price;
        return total + (itemPrice * item.quantity);
    }, 0);

    return (
        <div className="order-detail-container">
            <div className="order-detail-header">
                <h2>Chi tiết đơn hàng #{order.orderId}</h2>
                <button className="back-button" onClick={() => navigate('/orders')}>
                    Quay lại
                </button>
            </div>

            <div className="order-info-section">
                <div className="order-status-info">
                    <p>Trạng thái: <span className="status">{order.orderStatus}</span></p>
                    <p>Ngày đặt: {order.orderDate}</p>
                    <p>Phương thức thanh toán: {order.payment.paymentMethod}</p>
                </div>

                <div className="order-items-list">
                    <h3>Sản phẩm</h3>
                    {order.orderItems.map(item => {
                        const itemPrice = item.product.specialPrice > 0 
                            ? item.product.specialPrice 
                            : item.product.price;
                        
                        return (
                            <div key={item.orderItemId} className="order-item">
                                <img 
                                    src={`http://localhost:8080/api/public/products/image/${item.product.image}`}
                                    alt={item.product.productName}
                                />
                                <div className="item-details">
                                    <h4>{item.product.productName}</h4>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Giá: ${itemPrice.toFixed(2)}</p>
                                    <p>Tổng: ${(itemPrice * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="order-summary">
                    <h3>Tổng đơn hàng</h3>
                    <p className="total-amount">${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail; 