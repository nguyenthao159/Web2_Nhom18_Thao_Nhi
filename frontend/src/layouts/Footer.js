import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="section-footer bg-dark text-white py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4 col-12">
                        <h5 className="mb-3">Contact Us</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.</p>
                        <ul className="list-unstyled">
                            <li><i className="fas fa-map-marker-alt me-2"></i> 542 Fake Street, Cityname</li>
                            <li><i className="fas fa-envelope me-2"></i> info@example.com</li>
                            <li><i className="fas fa-phone me-2"></i> (800) 060-0730</li>
                            <li><i className="fas fa-clock me-2"></i> Mon-Sat 10:00am - 7:00pm</li>
                        </ul>
                    </div>
                    
                    <div className="col-md-2 col-6">
                        <h5 className="mb-3">Information</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-white">About Us</Link></li>
                            <li><Link to="#" className="text-white">Career</Link></li>
                            <li><Link to="#" className="text-white">Find a Store</Link></li>
                            <li><Link to="#" className="text-white">Rules and Terms</Link></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-2 col-6">
                        <h5 className="mb-3">My Account</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-white">Contact Us</Link></li>
                            <li><Link to="#" className="text-white">Money Refund</Link></li>
                            <li><Link to="#" className="text-white">Order Status</Link></li>
                            <li><Link to="#" className="text-white">Shipping Info</Link></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 col-12">
                        <h5 className="mb-3">Newsletter</h5>
                        <p>Subscribe to our newsletter to receive updates and exclusive offers.</p>
                        <form className="d-flex">
                            <input type="email" className="form-control me-2" placeholder="Enter your email" />
                            <button className="btn btn-warning">Subscribe</button>
                        </form>
                        <div className="mt-3">
                            <a href="#" className="btn btn-outline-light me-2"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="btn btn-outline-light me-2"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="btn btn-outline-light me-2"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="btn btn-outline-light"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="border-secondary my-4" />
                <div className="text-center text-muted">
                    <p>&copy; {new Date().getFullYear()} Company Name. All Rights Reserved.</p>
                    <p>Privacy Policy - Terms of Use - Legal Enquiry Guide</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
