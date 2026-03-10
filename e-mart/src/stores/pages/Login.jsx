import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Login = () => {
    const { login } = useUser()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (!email || !password) {
            setError('Please enter valid Email/Mobile')
            return
        }

        // Admin Check
        if (email === '9876543210' && password === 'admin123') {
            login('Admin', true)
            alert('Welcome Admin! You have successfully logged in.')
            navigate('/')
            return
        }

        // Generic Login
        const nameData = email.split('@')[0] || email
        login(nameData, false)
        navigate('/')
    }

    return (
        <div className="premium-login-container">
            <div className="premium-login-box">
                {/* Left Side - Illustration Panel */}
                <div className="premium-left-panel">
                    <img src="/assets/login_illustration.png" alt="E-Mart Login Concept" className="login-image-bg" />
                    <div className="premium-info-content">
                        <h2>E-Mart Premium</h2>
                        <p>Unlock personalized recommendations, track your orders, and manage your wishlist seamlessly.</p>
                    </div>
                </div>

                {/* Right Side - Form Panel */}
                <div className="premium-right-panel">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-form">
                        <div className="premium-input-group">
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className={email ? 'active' : ''}>Enter Email / Mobile</label>
                        </div>

                        <div className="premium-input-group">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className={password ? 'active' : ''}>Enter Password</label>
                            <span className="premium-forgot">Forgot?</span>
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <div className="premium-policy">
                            By continuing, you agree to E-Mart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                        </div>

                        <button type="submit" className="premium-login-btn">
                            Login into Account
                        </button>

                        <div className="premium-create-account">
                            <Link to="/" className="create-link">New to E-Mart? <span>Create an account</span></Link>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                .premium-login-container {
                    min-height: calc(100vh - 80px); /* Account for navbar */
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px;
                }

                .premium-login-box {
                    display: flex;
                    width: 1000px;
                    height: 600px;
                    background: var(--card-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--glass-border);
                    box-shadow: var(--shadow-hover);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    position: relative;
                }

                /* Left Panel */
                .premium-left-panel {
                    width: 45%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 40px;
                    overflow: hidden;
                }

                .premium-left-panel::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
                    z-index: 1;
                }

                .login-image-bg {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }

                .premium-info-content {
                    position: relative;
                    z-index: 2;
                    color: white;
                }

                .premium-info-content h2 {
                    font-size: 32px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
                }

                .premium-info-content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.9);
                    text-shadow: 0 1px 5px rgba(0,0,0,0.5);
                }

                /* Right Panel */
                .premium-right-panel {
                    width: 55%;
                    padding: 60px 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .login-header {
                    margin-bottom: 40px;
                }

                .login-header h2 {
                    font-size: 32px;
                    font-weight: 600;
                    color: var(--text-main);
                    margin-bottom: 8px;
                }

                .login-header p {
                    color: var(--text-muted);
                    font-size: 16px;
                }

                .premium-input-group {
                    position: relative;
                    margin-bottom: 32px;
                }

                .premium-input-group input {
                    width: 100%;
                    padding: 12px 16px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-sm);
                    outline: none;
                    font-size: 16px;
                    color: var(--text-main);
                    transition: all 0.3s ease;
                }

                /* Override for Light Theme if needed to darken borders */
                [data-theme='light'] .premium-input-group input {
                   border-color: rgba(0, 0, 0, 0.2);
                }

                .premium-input-group input:focus {
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05); /* Slight outer glow */
                }

                .premium-input-group label {
                    position: absolute;
                    left: 16px;
                    top: 14px;
                    color: var(--text-light);
                    pointer-events: none;
                    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) all;
                    font-size: 16px;
                    padding: 0 4px;
                    background: var(--bg-color); /* Cutout effect */
                }

                /* For proper label cutout masking on translucent card backgrounds */
                .premium-input-group label {
                    background: transparent;
                }

                .premium-input-group input:focus ~ label,
                .premium-input-group label.active {
                    top: -10px;
                    left: 12px;
                    font-size: 12px;
                    color: var(--primary-color);
                    font-weight: 500;
                    background: var(--bg-color); /* Actually mask the border */
                    border-radius: 4px;
                }

                .premium-forgot {
                    position: absolute;
                    right: 0;
                    top: -24px;
                    color: var(--primary-color);
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .premium-forgot:hover {
                    text-decoration: underline;
                }

                .premium-policy {
                    color: var(--text-light);
                    font-size: 13px;
                    margin-top: 24px;
                    margin-bottom: 32px;
                    line-height: 1.5;
                }

                .premium-policy a {
                    color: var(--primary-color);
                    text-decoration: none;
                    font-weight: 500;
                }

                .premium-policy a:hover {
                    text-decoration: underline;
                }

                .premium-login-btn {
                    background: var(--primary-gradient);
                    box-shadow: var(--shadow-soft);
                    border: none;
                    color: #fff;
                    width: 100%;
                    height: 52px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: var(--radius-pill);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .premium-login-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-hover);
                }

                .login-error {
                    color: #ef4444;
                    font-size: 14px;
                    margin-bottom: 16px;
                    margin-top: -16px;
                }

                .premium-create-account {
                    text-align: center;
                    margin-top: 32px;
                }
                
                .create-link {
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s;
                }

                .create-link span {
                    color: var(--primary-color);
                    font-weight: 600;
                    margin-left: 4px;
                }

                .create-link:hover span {
                    text-decoration: underline;
                }

                @media screen and (max-width: 1024px) {
                    .premium-login-box {
                        width: 100%;
                        height: auto;
                        flex-direction: column;
                    }
                    .premium-left-panel {
                        width: 100%;
                        height: 250px;
                        padding: 30px;
                    }
                    .premium-right-panel {
                        width: 100%;
                        padding: 40px 30px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Login
