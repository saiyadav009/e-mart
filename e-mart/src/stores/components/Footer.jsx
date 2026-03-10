import React from 'react'

const Footer = () => {
    return (
        <div className="footer-section">
            <div className="footer-content-wrapper">
                <div className="footer-container">
                    <div className="footer-col">
                        <h3 className="brand-text">E-Mart</h3>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                        <p>E-Mart Science</p>
                    </div>
                    <div className="footer-col">
                        <h3>Connect</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                        <p>YouTube</p>
                    </div>
                    <div className="footer-col">
                        <h3>Policy</h3>
                        <p>Return Policy</p>
                        <p>Terms of Use</p>
                        <p>Security</p>
                        <p>Privacy</p>
                    </div>
                    <div className="footer-col">
                        <h3>Help</h3>
                        <p>Payments</p>
                        <p>Shipping</p>
                        <p>Cancellation</p>
                        <p>FAQ</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 E-Mart Ultimate. Designed with Premium Glassmorphism.</p>
                </div>
            </div>

            <style jsx>{`
                .footer-section {
                    margin-top: 80px;
                    border-top: 1px solid var(--glass-border);
                    position: relative;
                }
                
                .footer-content-wrapper {
                    background: var(--glass-nav);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    color: var(--text-main);
                    padding: 60px 0 20px 0;
                    position: relative;
                    z-index: 10;
                }

                .footer-container {
                    display: flex;
                    justify-content: space-around;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-bottom: 40px;
                    border-bottom: 1px solid var(--glass-border);
                }

                .brand-text {
                    background: var(--primary-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 24px !important;
                    font-weight: 800 !important;
                    letter-spacing: -0.5px !important;
                    margin-bottom: 20px !important;
                }

                .footer-col h3 {
                    color: var(--text-main);
                    font-size: 15px;
                    margin-bottom: 25px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 700;
                }

                .footer-col p {
                    font-size: 14px;
                    color: var(--text-muted);
                    margin-bottom: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .footer-col p:hover {
                    color: var(--primary-color);
                    transform: translateX(4px);
                }

                .footer-bottom {
                    text-align: center;
                    padding-top: 30px;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-light);
                }
            `}</style>
        </div>
    )
}

export default Footer
