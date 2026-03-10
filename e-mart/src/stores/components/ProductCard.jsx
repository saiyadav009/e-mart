import React from 'react'
import { Link } from 'react-router-dom'
import { GlowingEffect } from './ui/GlowingEffect'

const ProductCard = ({ item, linkPath, children }) => {
    return (
        <div className='imgBox' style={{ position: 'relative', overflow: 'hidden' }}>
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Link to={linkPath} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <img
                        className="proImage"
                        src={item.image}
                        alt={item.product || item.title || item.model || ''}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-end' }}>
                        <p>
                            {/* Product Name/Title mapping */}
                            {item.title || item.product || item.model || item.company}
                        </p>
                        <p>
                            {/* Brand/Secondary Details */}
                            {item.brand || item.company || 'Top Rated'}
                        </p>
                        <p>
                            {/* Price is styled by CSS via p:last-of-type */}
                            {item.price}
                        </p>
                    </div>
                </Link>
                {children}
            </div>
        </div>
    )
}

export default ProductCard
