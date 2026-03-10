import React from 'react'
import Navbar from '../components/Navbar'
import CategoryStrip from '../components/CategoryStrip'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div>
      <Navbar />
      <CategoryStrip />
      <Hero />
      <Products />
      <Footer />
    </div>
  )
}

export default LandingPage