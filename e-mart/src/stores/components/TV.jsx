import React from 'react'
import { tvData } from '../data/tv'
import { Link } from 'react-router-dom'

const TV = () => {
    const firstFiveImages = tvData.slice(0, 5)
    return (
        <div className="deal-container" style={{ display: 'flex', gap: '24px', padding: '16px 60px' }}>
            {/* Left Promotional Banner */}
            <div className="deal-banner" style={{ minWidth: '280px', flexShrink: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', background: 'url(/assets/banners/tv_banner.png) center/cover no-repeat', borderRadius: 'var(--radius-md)' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}>Smart TVs</h2>
                <Link to='/tv' style={{ padding: '10px 24px', background: 'var(--primary-color)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: '600', textDecoration: 'none' }}>VIEW ALL</Link>
            </div>

            {/* Right Product Slider */}
            <div className="deal-slider" style={{ flex: 1, backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-md)', padding: '24px', overflow: 'hidden' }}>
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Top Televisions</h2>
                </div>
                <div className='proSection' style={{ padding: '0', margin: '0' }}>
                    {
                        firstFiveImages.map((item) => {
                            return (
                                <div className='imgBox' key={item.id || Math.random()}>
                                    <Link to={`/tv/${item.id}`}>
                                        <img className='proImage' src={item.image} alt={item.model} />
                                    </Link>
                                    <div className="proDetails">
                                        <p className="proBrand">{item.brand} {item.model}</p>
                                        <p className="proPrice">₹{item.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TV
