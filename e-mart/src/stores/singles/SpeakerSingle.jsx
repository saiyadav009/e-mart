import React from "react";
import { speakerData } from "../data/speaker";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const SpeakerSingle = () => {
    const { id } = useParams();
    const { addToCart, cartItems } = useCart();

    // speakerData doesn't have explicit IDs in the original file, so we map by index + 1 or adjust if they are missing.
    // Actually, wait, let me look at speaker.js. It doesn't have an "id" field! 
    // Let me assign it dynamically if it doesn't exist just for the lookup, but the app passes `id` in URL.
    // We'll write a quick fallback to match by index if ID doesn't exist.
    let product = speakerData.find((item) => item.id === id);
    if (!product) {
        // Fallback if ID wasn't encoded in the data array
        product = speakerData[parseInt(id) - 1];
    }

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

export default SpeakerSingle;
