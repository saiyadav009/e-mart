import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const banners = [
        "/assets/banners/banner1.png",
        "/assets/banners/banner2.png",
        "/assets/banners/banner3.png"
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [banners.length])

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }

    return (
        <div className="hero-carousel">
            <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div className="carousel-item" key={index}>
                        <div className="carousel-image-wrapper">
                            <img src={banner} alt={`Promotional Banner ${index + 1}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button className="carousel-control prev" onClick={goToPrev}>&#10094;</button>
            <button className="carousel-control next" onClick={goToNext}>&#10095;</button>

            {/* Pagination Dots */}
            <div className="carousel-dots">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>

            <style>{`
                .hero-carousel {
                    width: 100%;
                    height: 320px;
                    position: relative;
                    background-color: transparent;
                    margin-bottom: 32px;
                    padding: 0 60px;
                }

                .carousel-inner {
                    display: flex;
                    height: 100%;
                    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .carousel-item {
                    min-width: 100%;
                    height: 100%;
                    position: relative;
                    padding: 0 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .carousel-image-wrapper {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    border-radius: var(--radius-lg);
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--glass-border);
                    box-shadow: var(--shadow-soft);
                    transition: all 0.5s ease;
                    z-index: 1;
                }

                .carousel-item:hover .carousel-image-wrapper {
                    transform: scale(1.02);
                    border-color: var(--primary-color);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(79, 70, 229, 0.2);
                }

                .carousel-image-wrapper::after {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: calc(var(--radius-lg) + 2px);
                    background: var(--primary-gradient);
                    z-index: -1;
                    opacity: 0;
                    filter: blur(15px);
                    transition: opacity 0.5s ease;
                }

                .carousel-item:hover .carousel-image-wrapper::after {
                    opacity: 0.8;
                }

                .carousel-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: var(--radius-lg);
                    opacity: 0.9;
                    transition: opacity 0.4s ease;
                }

                .carousel-item:hover img {
                    opacity: 1;
                }

                .carousel-control {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: var(--text-main);
                    font-size: 20px;
                    padding: 16px;
                    cursor: pointer;
                    border-radius: 50%;
                    box-shadow: var(--shadow-nav);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px;
                    height: 48px;
                }

                .carousel-control:hover {
                    background: var(--primary-gradient);
                    color: #ffffff;
                    border-color: transparent;
                    box-shadow: 0 0 15px var(--primary-color);
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-control.prev {
                    left: 80px;
                }

                .carousel-control.next {
                    right: 80px;
                }

                .carousel-dots {
                    position: absolute;
                    bottom: -24px;
                    width: 100%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }

                .dot {
                    cursor: pointer;
                    height: 6px;
                    width: 24px;
                    background-color: rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-pill);
                    display: inline-block;
                    transition: all 0.3s ease;
                    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
                }

                .dot.active {
                    background: var(--primary-gradient);
                    width: 48px;
                    box-shadow: 0 0 10px var(--primary-color);
                }

                .dot:hover:not(.active) {
                    background-color: rgba(255, 255, 255, 0.5);
                }

                @media (max-width: 1024px) {
                    .hero-carousel { padding: 0 24px; height: 280px; }
                    .carousel-control.prev { left: 40px; }
                    .carousel-control.next { right: 40px; }
                }

                @media (max-width: 768px) {
                    .hero-carousel { height: 180px; padding: 0 16px; margin-bottom: 40px; }
                    .carousel-control { display: none; } /* Hide arrows on small screens */
                }
        `}</style>
        </div>
    )
}

export default Hero
