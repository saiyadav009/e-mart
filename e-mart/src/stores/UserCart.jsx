import React, { useState } from 'react'
import { useCart } from './context/CartContext'
import Navbar from './components/Navbar';
import { GlowingEffect } from './components/ui/GlowingEffect';
import { Link } from 'react-router-dom';

const UserCart = () => {
    const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)

    // Calculate Total Price considering quantities
    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/,/g, ''))
        const qty = item.quantity || 1
        return total + (price * qty)
    }, 0).toFixed(2)

    const handleCheckout = () => {
        setIsCheckingOut(true)
        setTimeout(() => {
            setIsCheckingOut(false)
            setOrderPlaced(true)
            clearCart()
        }, 1500)
    }

    if (orderPlaced) {
        return (
            <>
                <Navbar />
                <div style={{
                    maxWidth: '800px', margin: '100px auto', textAlign: 'center',
                    padding: '60px', borderRadius: '24px', background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 8px 32px rgba(31,38,135,0.1)', border: '1px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ fontSize: '72px', color: '#4CAF50', marginBottom: '20px' }}>✅</div>
                    <h1 style={{ fontSize: '36px', color: '#333', marginBottom: '15px' }}>Order Placed Successfully!</h1>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>Thank you for shopping at E-Mart. Your items are being prepared for shipment.</p>
                    <Link to="/" style={{
                        padding: '15px 40px', background: '#2874f0', color: 'white',
                        textDecoration: 'none', fontWeight: 'bold', borderRadius: '8px', fontSize: '16px'
                    }}>
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div style={{
                maxWidth: '1200px',
                margin: '40px auto',
                padding: '20px',
                minHeight: '80vh',
                position: 'relative'
            }}>
                {/* Background Glow Effect */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(231,60,126,0.15) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>

                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '30px',
                    color: 'var(--text-main)',
                    borderLeft: `5px solid var(--primary-color)`,
                    paddingLeft: '15px',
                    display: 'inline-block'
                }}>
                    Your Tech Arsenal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})
                </h2>

                {cartItems.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-soft)',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <h2 style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your Cart is Empty</h2>
                        <Link to="/" style={{
                            display: 'inline-block',
                            padding: '12px 30px',
                            background: 'var(--primary-gradient)',
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            borderRadius: '50px',
                            boxShadow: 'var(--shadow-soft)',
                            transition: 'all 0.3s ease'
                        }}>
                            Start Exploring
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                        {/* LEFT SIDE: PRODUCTS LIST */}
                        <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '25px',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    <div style={{ width: '140px', height: '140px', flexShrink: 0, marginRight: '30px', padding: '10px', background: 'white', borderRadius: '15px' }}>
                                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '20px', margin: '0 0 8px 0', color: '#111', fontWeight: '700' }}>{item.product}</h3>
                                        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0', fontFamily: 'monospace' }}>{item.company || item.brand} | {item.model}</p>
                                        <h2 style={{ fontSize: '24px', color: '#2874f0', fontWeight: 'bold', marginBottom: '15px' }}>₹{item.price}</h2>

                                        {/* QUANTITY CONTROLS */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
                                                <button onClick={() => decreaseQuantity(item.id)} style={{ padding: '5px 15px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>-</button>
                                                <span style={{ padding: '5px 15px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', background: 'white', fontWeight: 'bold' }}>{item.quantity || 1}</span>
                                                <button onClick={() => increaseQuantity(item.id)} style={{ padding: '5px 15px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>+</button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item)}
                                                style={{
                                                    padding: '8px 20px',
                                                    background: 'rgba(255, 77, 79, 0.1)',
                                                    border: '1px solid rgba(255, 77, 79, 0.3)',
                                                    color: '#ff4d4f',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = '#ff4d4f';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)';
                                                    e.currentTarget.style.color = '#ff4d4f';
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE: PRICE SUMMARY */}
                        <div style={{ flex: '1', minWidth: '320px' }}>
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '2px' }}>
                                    {/* Glowing Border Wrapper */}
                                    <GlowingEffect
                                        spread={50}
                                        glow={true}
                                        disabled={false}
                                        proximity={80}
                                        inactiveZone={0.01}
                                        borderWidth={4}
                                    />
                                    <div style={{
                                        position: 'relative',
                                        background: 'rgba(255,255,255,0.9)',
                                        borderRadius: '22px',
                                        padding: '30px',
                                        zIndex: 10,
                                        backdropFilter: 'blur(20px)'
                                    }}>
                                        <h3 style={{
                                            fontSize: '22px',
                                            fontWeight: '800',
                                            borderBottom: '2px solid #f0f0f0',
                                            paddingBottom: '20px',
                                            marginBottom: '20px',
                                            color: '#333'
                                        }}>
                                            Order Summary
                                        </h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', color: '#666' }}>
                                            <span>Price ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</span>
                                            <span>₹{totalPrice}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', color: '#666' }}>
                                            <span>Discount</span>
                                            <span style={{ color: '#388e3c' }}>- ₹0</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', color: '#666' }}>
                                            <span>Delivery Charges</span>
                                            <span style={{ color: '#388e3c', fontWeight: 'bold' }}>FREE</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: '25px',
                                            paddingTop: '20px',
                                            borderTop: '2px dashed #e0e0e0',
                                            fontSize: '22px',
                                            fontWeight: '800',
                                            color: '#111'
                                        }}>
                                            <span>Total Amount</span>
                                            <span>₹{totalPrice}</span>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            disabled={isCheckingOut}
                                            style={{
                                                width: '100%',
                                                marginTop: '30px',
                                                padding: '18px',
                                                background: isCheckingOut ? '#ccc' : 'linear-gradient(45deg, #fb641b, #f09819)',
                                                color: isCheckingOut ? '#666' : 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                                                boxShadow: isCheckingOut ? 'none' : '0 8px 20px rgba(251, 100, 27, 0.4)',
                                                transition: 'all 0.2s',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            {isCheckingOut ? 'PROCESSING...' : 'CHECKOUT NOW'}
                                        </button>
                                        <p style={{ fontSize: '13px', color: '#aaa', marginTop: '20px', textAlign: 'center', fontWeight: '500' }}>
                                            <span style={{ marginRight: '5px' }}>🔒</span>
                                            Safe and Secure Payments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserCart