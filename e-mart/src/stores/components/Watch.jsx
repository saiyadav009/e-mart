// ...existing code...
import React from 'react'
import { Link } from 'react-router-dom'
import { watchData } from '../data/watch'
import ProductCard from './ProductCard'

const Watch = () => {
  const firstFiveImages = watchData.slice(0, 5)
  return (
            <div className="deal-container" style={{ display: 'flex', gap: '24px', padding: '16px 60px' }}>
      {/* Left Promotional Banner */}
      <div className="deal-banner" style={{ minWidth: '280px', flexShrink: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', background: 'url(/assets/banners/watch_banner.png) center/cover no-repeat', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}>Top Smartwatches</h2>
        <Link to='/watch' style={{ padding: '10px 24px', background: 'var(--primary-color)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>VIEW ALL</Link>
      </div>

      {/* Right Product Slider */}
      <div className="deal-slider" style={{ flex: 1, backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-md)', padding: '24px', overflow: 'hidden' }}>
        <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Top Smartwatches</h2>
        </div>
        <div className='proSection' style={{ padding: '0', margin: '0' }}>
          {
            firstFiveImages.map((item) => {
              return (
                <ProductCard key={item.id || Math.random()} item={item} linkPath='/watch' />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Watch