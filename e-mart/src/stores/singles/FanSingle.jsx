import React from "react";
import { fansData } from "../data/fans";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const FanSingle = () => {
    const { id } = useParams();
    const { addToCart } = useCart()
    const product = fansData.find((item) => item.id === id);

    if (!product) return null;

    return (
        <>
            <Navbar />
            <div className="ind-section">
                {/* Image Section */}
                <div className="ind-image">
                    <img
                        src={product.image}
                        alt={product.model}
                    />
                </div>

                {/* Details Section */}
                <div className="ind-details">
                    <div className="ind-company">
                        <h2>{product.brand}</h2>
                    </div>
                    <div className="ind-model">
                        <h3>{product.model}</h3>
                    </div>
                    <div className="ind-price">
                        <h2>{product.price}</h2>
                    </div>
                    <div className="ind-desc">
                        <p>{product.description}</p>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                    >
                        <span>🛒</span> Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default FanSingle;
