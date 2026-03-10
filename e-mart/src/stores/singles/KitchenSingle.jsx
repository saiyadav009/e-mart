import React from "react";
import { kitchenData } from "../data/kitchen";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const KitchenSingle = () => {
    const { id } = useParams();
    const { addToCart, cartItems } = useCart();

    const product = kitchenData.find((item) => item.id === id);

    if (!product) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>Product Not Found</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="ind-section">
                <div className="ind-image">
                    <img src={`/${product.image}`} alt={product.model} />
                </div>
                <div className="ind-details space">
                    <div className="ind-company">
                        <h2>{product.brand}</h2>
                    </div>
                    <div className="ind-model space">
                        <h3>{product.model}</h3>
                    </div>
                    <div className="ind-price space">
                        <h2>₹{product.price}</h2>
                    </div>
                    <div className="ind-desc space">
                        <p>{product.description}</p>
                    </div>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            </div>
        </>
    );
};

export default KitchenSingle;
