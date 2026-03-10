import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1, padding: '80px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '20px', color: 'var(--primary-color)' }}>{title}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                    This section is currently under development. AI integration coming soon!
                </p>
                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid var(--glass-border)',
                        borderTopColor: 'var(--primary-color)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PlaceholderPage;
