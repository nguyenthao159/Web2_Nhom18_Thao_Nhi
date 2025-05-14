import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GET_ID, GET_ALL } from '../api/apiService';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!productId) {
                    console.error('Product ID is missing');
                    setLoading(false);
                    return;
                }

                // Fetch main product
                const productResponse = await GET_ID('public/products', productId);
                setProduct(productResponse);

                // Fetch related products
                if (productResponse?.category?.id) {
                    const params = {
                        pageNumber: 0,
                        pageSize: 4,
                        sortBy: 'productId',
                        sortOrder: 'asc'
                    };
                    const relatedResponse = await GET_ALL(`categories/${productResponse.category.id}/products`, params);
                    const filteredProducts = relatedResponse.content.filter(
                        item => item.productId !== productResponse.productId
                    );
                    setRelatedProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleQuantityChange = (value) => {
        setQuantity(prev => Math.max(1, prev + value));
    };

    const handleAddToCart = async () => {
        try {
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('authToken');

            if (!userStr || !token) {
                toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
                navigate('/login');
                return;
            }

            const user = JSON.parse(userStr);
            if (!user || !user.GH || !user.GH.cartId) {
                toast.error('Không tìm thấy thông tin giỏ hàng!');
                return;
            }

            // Gửi request thêm sản phẩm vào giỏ hàng
            await axios.post(
                `http://localhost:8080/api/public/carts/${user.GH.cartId}/products/${product.productId}/quantity/${quantity}`,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        } catch (error) {
            console.error('Add to cart error:', error);
            if (error.response?.status === 401) {
                toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!');
                navigate('/login');
            } else {
                toast.error('Không thể thêm sản phẩm vào giỏ hàng!');
            }
        }
    };

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!product) return <div className="container mt-5">Product not found</div>;

    return (
        <div className="product-detail-wrapper">
            <div className="product-detail-container">
                <section className="product-detail-breadcrumb">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item">
                                <a href={`/category/${product.category.id}`}>
                                    {product.category.name || 'Category'}
                                </a>
                            </li>
                            <li className="breadcrumb-item active">{product.productName}</li>
                        </ol>
                    </div>
                </section>

                <section className="product-detail-content">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-6">
                                <div className="product-detail-gallery">
                                    <div className="product-detail-image">
                                        <div className="product-detail-img-wrap">
                                            <img 
                                                src={`http://localhost:8080/api/public/products/image/${product.image}`}
                                                alt={product.productName}
                                                className="detail-product-image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <main className="col-md-6">
                                <article className="product-detail-info">
                                    <h2 className="detail-product-title">{product.productName}</h2>
                                    
                                    {product.discount > 0 && (
                                        <div className="detail-discount-badge">
                                            -{product.discount}% OFF
                                        </div>
                                    )}

                                    <div className="detail-price-info">
                                        <span className="detail-current-price">
                                            ${product.price}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="detail-original-price">
                                                ${(product.price * (100 + product.discount) / 100).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="detail-description">
                                        <h5>Description</h5>
                                        <p>{product.description || 'No description available'}</p>
                                    </div>

                                    <div className="detail-actions">
                                        <div className="detail-quantity-selector">
                                            <button 
                                                className="btn btn-light"
                                                onClick={() => handleQuantityChange(-1)}
                                            >
                                                -
                                            </button>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                min="1" 
                                            />
                                            <button 
                                                className="btn btn-light"
                                                onClick={() => handleQuantityChange(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="detail-add-to-cart"
                                            onClick={handleAddToCart}
                                        >
                                            <i className="fas fa-shopping-cart"></i>
                                            Add to Cart
                                        </button>
                                    </div>
                                </article>
                            </main>
                        </div>
                    </div>
                </section>
            </div>

            <section className="related-products-section">
                <div className="container">
                    <h3 className="related-products-title">Related Products</h3>
                    <div className="row">
                        {relatedProducts.map(relatedProduct => (
                            <div key={relatedProduct.productId} className="col-md-3 col-6">
                                <div className="related-product-card">
                                    <Link to={`/Detail/${relatedProduct.productId}`} className="related-product-link">
                                        <div className="related-product-image">
                                            <img 
                                                src={`http://localhost:8080/api/public/products/image/${relatedProduct.image}`}
                                                alt={relatedProduct.productName}
                                            />
                                        </div>
                                        <div className="related-product-info">
                                            <h4 className="related-product-name">{relatedProduct.productName}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
