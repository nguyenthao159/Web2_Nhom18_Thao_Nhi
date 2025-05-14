import React from "react";
import "./Section2.css"; // Import file CSS

const products = [
    { image: require("../../assets/images/items/hinh1.jpg"), discount: "10% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/hinh2.jpg"), discount: "85% OFF", title: "Some item name here" },
    { image: require("../../assets/images/items/hinh3.jpg"), discount: "10% OFF", title: "Great product name here" },
    { image: require("../../assets/images/items/hinh4.jpg"), discount: "90% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/hinh5.jpg"), discount: "20% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/hinh6.jpg"), discount: "20% OFF", title: "Some item name here" },
];

const Section2 = () => (
    <section className="section-deals">
        <header className="section-heading">
            <h3 className="title-section">Daily Deals</h3>
        </header>

        <div className="row">
            {products.map((product, index) => (
                <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-6">
                    <div className="card card-product">
                        <a href="#" className="img-wrap">
                            <span className="badge-discount">{product.discount}</span>
                            <img src={product.image} alt={product.title} className="product-img" />
                        </a>
                        <figcaption className="info-wrap">
                            <a href="#" className="title">{product.title}</a>
                            <div className="price-wrap">
                                <span className="price">$45</span>
                                <del className="price-old">$90</del>
                            </div>
                        </figcaption>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Section2;
