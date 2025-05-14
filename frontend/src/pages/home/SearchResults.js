import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GET_ALL } from '../../api/apiService';
import './SearchResults.css';

function SearchResults() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        const pageNumber = params.get('pageNumber') || 1;
        const pageSize = params.get('pageSize') || 10;
        const sortBy = params.get('sortBy') || 'id';
        const sortOrder = params.get('sortOrder') || 'ASC';

        GET_ALL(
            `http://localhost:8080/api/public/products/keyword/${query}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        )
            .then((data) => {
                setProducts(data.content || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, [location.search]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">
                Kết quả tìm kiếm cho từ khóa: "
                {new URLSearchParams(location.search).get('query')}"
            </h2>

            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.productId} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="card card-product-grid h-100">
                            <figure className="img-wrap">
                                <Link to={`/Detail/${product.productId}`}>
                                    <img
                                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                                        alt={product.productName}
                                        className="img-fluid"
                                    />
                                </Link>
                                {product.discount > 0 && (
                                    <span className="discount-badge">-{product.discount}%</span>
                                )}
                            </figure>
                            <figcaption className="info-wrap text-center">
                                <Link to={`/Detail/${product.productId}`} className="title">
                                    {product.productName}
                                </Link>
                                <div className="price">
                                    ${product.specialPrice?.toFixed(2) || product.price?.toFixed(2)}
                                </div>
                            </figcaption>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
