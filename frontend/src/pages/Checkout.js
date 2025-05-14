import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
    const [orderData, setOrderData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy dữ liệu đơn hàng từ localStorage
    useEffect(() => {
        const data = localStorage.getItem('checkoutItems');
        if (!data) {
            toast.error('Không có thông tin đơn hàng!');
            return navigate('/cart');
        }

        try {
            const parsed = JSON.parse(data);
            if (!parsed.items || !parsed.totalAmount) {
                throw new Error('Dữ liệu không hợp lệ!');
            }

            console.log('Dữ liệu đơn hàng:', parsed);
            setOrderData(parsed);
        } catch (err) {
            console.error('Lỗi khi parse checkoutItems:', err);
            toast.error('Dữ liệu đơn hàng không hợp lệ!');
            navigate('/cart');
        }
    }, [navigate]);

    const handlePlaceOrder = async () => {
        console.log("Người dùng đã bấm nút đặt hàng");

        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');

        if (!userStr || !token) {
            toast.error('Vui lòng đăng nhập để đặt hàng!');
            return navigate('/login');
        }

        let user;
        try {
            user = JSON.parse(userStr);
        } catch (err) {
            console.error('Lỗi khi parse user:', err);
            toast.error('Lỗi người dùng. Vui lòng đăng nhập lại!');
            return navigate('/login');
        }

        // Lấy cartId an toàn hơn
        const cartId = user.cart?.cartId || user.cartId;
        if (!cartId) {
            console.error('Không tìm thấy cart trong user:', user);
            toast.error('Không tìm thấy giỏ hàng!');
            return;
        }

        const encodedEmail = encodeURIComponent(user.email);
        const url = `http://localhost:8080/api/public/users/${encodedEmail}/carts/{cartId}/payments/${paymentMethod}/order`;

        console.log('Gửi đơn hàng tới URL:', url);
        setLoading(true);

        try {
            const response = await axios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Phản hồi API:", response);

            if (response.status >= 200 && response.status < 300) {
                localStorage.removeItem('checkoutItems');
                toast.success('Đặt hàng thành công!');
                navigate('/orders');
            } else {
                toast.error('Không thể đặt hàng. Hãy thử lại!');
            }
        } catch (err) {
            console.error('Lỗi đặt hàng:', err.response || err);
            const errMsg = err?.response?.data?.message || 'Đặt hàng thất bại!';
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) return <div className="loading">Đang tải đơn hàng...</div>;

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <div className="checkout-summary">
                    <h2>Xác nhận đơn hàng</h2>
                    <div className="order-items">
                        {orderData.items.map(item => (
                            <div key={item.productId} className="order-item">
                                <img 
                                    src={`http://localhost:8080/api/public/products/image/${item.image}`}
                                    alt={item.productName} 
                                />
                                <div className="item-info">
                                    <h3>{item.productName}</h3>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Giá: ${item.price}</p>
                                    <p>Thành tiền: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <h3>Tổng cộng</h3>
                        <p>
                            $
                            {orderData.items
                                .reduce((total, item) => total + item.price * item.quantity, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="payment-section">
                    <h2>Phương thức thanh toán</h2>
                    <div className="payment-methods">
                        <label>
                            <input
                                type="radio"
                                value="CASH_ON_DELIVERY"
                                checked={paymentMethod === 'CASH_ON_DELIVERY'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Thanh toán khi nhận hàng
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="CREDIT_CARD"
                                checked={paymentMethod === 'CREDIT_CARD'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Thẻ tín dụng
                        </label>
                    </div>

                    <button
                        className="place-order-button"
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
