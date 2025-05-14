import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Banner.css'; // Tạo file CSS riêng cho Banner
import ban1 from "../../assets/images/banners/b1.jpg";
import ban2 from "../../assets/images/banners/b2.webp";
import ban3 from "../../assets/images/banners/b3.webp";
const Banner = () => {
    return (
        <section className="banner-section">
            <div className="container">
                <Carousel fade interval={3000} indicators={true} controls={true}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 banner-image"
                            src={ban2} // Thay đường dẫn ảnh của bạn
                            alt="First slide"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Chào mừng đến với Coffe Nhà Thảo</h3>
                            <p>Khám phá xu hướng coffe mới nhất</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 banner-image"
                            src={ban1} // Thay đường dẫn ảnh của bạn
                            alt="Second slide"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Ưu đãi đặc biệt</h3>
                            <p>Giảm giá lên đến 50% cho các sản phẩm hot</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 banner-image"
                            src={ban3} // Thay đường dẫn ảnh của bạn
                            alt="Third slide"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Bộ sưu tập mới</h3>
                            <p>Khám phá ngay bộ sưu tập coffe mùa hè 2024</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </section>
    );
};

export default Banner; 