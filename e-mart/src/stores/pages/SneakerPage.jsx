import React, { useState } from 'react'
import { sneakerData } from '../data/sneakers'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const SneakerPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }

    const uniqueBrands = [...new Set(sneakerData.map(item => item.brand))]

    const filteredProduct = selectedProduct.length === 0 ?
        sneakerData : sneakerData.filter((orange) => selectedProduct.includes(orange.brand))

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {uniqueBrands.map((brand) => {
                        return (
                            <div className='pro-input' key={brand}>
                                <label>
                                    <input type="checkbox"
                                        checked={selectedProduct.includes(brand)}
                                        onChange={() => companyHandler(brand)}
                                    />
                                    {brand}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <ProductCard key={item.id} item={item} linkPath={`/sneakers/${item.id}`} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SneakerPage
