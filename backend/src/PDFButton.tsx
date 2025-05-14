import React, { useEffect, useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { HiOutlinePrinter } from 'react-icons/hi';

const PDFButton = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const cartId = localStorage.getItem("globalCartId");
            const token = localStorage.getItem('jwt-token');
            const email = localStorage.getItem("globalEmailCart");

            if (!cartId) {
                setError(new Error('No cart ID found.'));
                setLoading(false);
                return;
            }
            if (!token) {
                setError(new Error('No token found.'));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/public/users/nguyenthaoken159@gmail.com/carts/${cartId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (fetchError) {
                setError(fetchError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const styles = {
        btn: {
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            color: '#ffd700',
            fontWeight: 700,
            cursor: 'pointer',
            userSelect: 'none',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
        },
        hover: {
            backgroundColor: '#ffd70010',
            color: '#333',
        },
    };

    const handleMouseEnter = (e:any) => {
        e.currentTarget.style.backgroundColor = styles.hover.backgroundColor;
        e.currentTarget.style.color = styles.hover.color;
    };

    const handleMouseLeave = (e:any) => {
        e.currentTarget.style.backgroundColor = styles.btn.backgroundColor;
        e.currentTarget.style.color = styles.btn.color;
    };

    return (
        <BlobProvider document={<MyDocument data={data} />}>
            {({ url, blob }) => (
                url ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.btn}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <HiOutlinePrinter size={17} />
                        <span style={{ textDecoration: 'none' }}>PRINT</span>
                    </a>
                ) : (
                    <div>Error generating PDF</div>
                )
            )}
        </BlobProvider>
    );
};

export default PDFButton;
