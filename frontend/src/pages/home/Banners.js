import React from "react";
import "./Banners.css"; // Import CSS

const Banner = () => (
    <section className="banner-section">
        <div className="row">
            <aside className="col-md-6">
                <div className="card-banner">
                    <img src={require("../../assets/images/banners/hinhnen1.jpg")} className="card-img" alt="Big Deal on Clothes" />
                    <div className="card-overlay">
                        <h2 className="card-title">Big Deal on Clothes</h2>
                        <p className="card-text">
                            Get amazing discounts on the latest fashion trends. Shop now and enjoy exclusive offers!
                        </p>
                        <a href="#" className="btn-discover">Discover</a>
                    </div>
                </div>
            </aside>
            <aside className="col-md-6">
                <div className="card-banner">
                    <img src={require("../../assets/images/banners/hinhnen2.jpg")} className="card-img" alt="Great Bundle for You" />
                    <div className="card-overlay">
                        <h2 className="card-title">Great Bundle for You</h2>
                        <p className="card-text">
                            Exclusive bundle deals available for a limited time. Don't miss out!
                        </p>
                        <a href="#" className="btn-discover">Discover</a>
                    </div>
                </div>
            </aside>
        </div>
    </section>
);

export default Banner;
