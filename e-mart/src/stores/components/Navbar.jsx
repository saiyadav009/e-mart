import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../stores/context/CartContext'
import { useUser } from '../../stores/context/UserContext'
import { useTheme } from '../../stores/context/ThemeContext'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`)
    }
  }

  const { cartItems } = useCart()
  const { user, logout } = useUser()
  const { theme, toggleTheme } = useTheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Calculate total quantity of items in cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="navSection">
        <div className="title">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>
              <img src="/assets/emart_logo.png" alt="E-Mart Logo" />
              <i>E-Mart</i>
            </h2>
          </Link>
        </div>

        <div className="search">
          <form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Simple SVG icon for search */}
            <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
          </form>
        </div>

        <div className="user">
          <div
            onClick={toggleTheme}
            style={{
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(4px)',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
              transition: 'all 0.3s ease'
            }}
            title={theme === 'blue' ? 'Switch to Green Theme' : 'Switch to Blue Theme'}
          >
            {theme === 'blue' ? '🔵' : '🟢'}
          </div>

          {user.isLogin ? (
            <div className="user-profile-container" ref={dropdownRef}>
              <div className="user-detail" onClick={() => setShowDropdown(!showDropdown)}>
                {user.name} <span style={{ fontSize: '12px', marginLeft: '6px' }}>▼</span>
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <strong>Hello, {user.name}!</strong>
                  </div>
                  <ul className="dropdown-menu">
                    <li><Link to="/profile" onClick={() => setShowDropdown(false)}>👤 My Profile</Link></li>
                    <li><Link to="/settings" onClick={() => setShowDropdown(false)}>⚙️ Settings</Link></li>
                    <li><Link to="/orders" onClick={() => setShowDropdown(false)}>📦 Orders</Link></li>
                    <li><Link to="/wishlist" onClick={() => setShowDropdown(false)}>❤️ Wishlist</Link></li>
                    <li className="logout-btn" onClick={() => { logout(); setShowDropdown(false); }}>🚪 Logout</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <div className="user-detail">
                Login
              </div>
            </Link>
          )}

          <Link to="/cart" style={{ textDecoration: 'none', color: '#fff' }}>
            <div className="cart">
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
              Cart
              <span>{cartItems.length > 0 ? `(${totalQuantity})` : ''}</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar