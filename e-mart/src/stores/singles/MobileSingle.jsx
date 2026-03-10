import React from "react";
import { mobileData } from "../data/mobiles";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const MobileSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart()
  const product = mobileData.find((item) => item.id === id);

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto',
        display: 'flex',
        gap: '60px',
        padding: '40px',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        {/* Image Section */}
        <div style={{
          flex: '1',
          background: 'white',
          borderRadius: '30px',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(231,60,126,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0
          }}></div>
          <img
            src={product.image}
            alt={product.model}
            style={{
              maxWidth: '80%',
              maxHeight: '400px',
              objectFit: 'contain',
              zIndex: 1,
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1) rotate(2deg)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
          />
        </div>

        {/* Details Section */}
        <div style={{ flex: '1' }}>
          <h2 style={{
            marginTop: 0,
            fontSize: '18px',
            color: '#e73c7e',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 'bold'
          }}>
            {product.company}
          </h2>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '900',
            margin: '10px 0 20px 0',
            color: '#1a1a1a',
            lineHeight: '1.1'
          }}>
            {product.model}
          </h1>
          <h3 style={{
            fontSize: '36px',
            color: '#007aff',
            margin: '0 0 30px 0',
            fontWeight: '800'
          }}>
            {product.price}
          </h3>

          <div style={{
            padding: '25px',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: '20px',
            marginBottom: '30px',
            lineHeight: '1.6',
            color: '#555',
            fontSize: '16px'
          }}>
            {product.description}
          </div>

          <button
            onClick={() => addToCart(product)}
            style={{
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(45deg, #222, #000)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            <span>🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSingle;
