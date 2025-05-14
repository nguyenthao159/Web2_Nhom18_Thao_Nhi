import React, { useState } from "react";
import { LOGIN, GET_USER_INFO } from "../../api/apiService";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './Login.css';

const SectionContent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { updateUserName } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const loginResponse = await LOGIN({ email, password });
            console.log("Login Response:", loginResponse);

            if (loginResponse && loginResponse.data) {
                const token = loginResponse.data['jwt-token'];
                if (token) {
                    localStorage.setItem('authToken', token);
                    try {
                        const userResponse = await GET_USER_INFO(email);
                        console.log("User Response:", userResponse);

                        if (userResponse) {
                            const userData = {
                                userId: userResponse.userId,
                                firstName: userResponse.firstName,
                                email: userResponse.email,
                                cartId:userResponse.cart.cartId,
                                GH:userResponse.cart,
                                roles: userResponse.roles
                                
                            };
                            localStorage.setItem('user', JSON.stringify(userData));
                            updateUserName(userResponse.firstName); // Cập nhật tên người dùng
                            navigate('/'); // Chuyển hướng về trang chủ
                        }
                    } catch (userError) {
                        console.error('Error fetching user info:', userError);
                        setError('Không thể lấy thông tin người dùng');
                    }
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">
                        Đăng nhập
                    </button>
                    <div className="additional-links">
                        <Link to="/register" className="register-link">
                            Chưa có tài khoản? Đăng ký ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SectionContent;