import React, { useState } from 'react'
import { riceCookerData } from '../data/rice_cookers'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const RiceCookerPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }

    const filteredProduct = selectedProduct.length === 0 ?
        riceCookerData : riceCookerData.filter((orange) => selectedProduct.includes(orange.brand))

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {riceCookerData.map((phone) => {
                        return (
                            <div className='pro-input' key={phone.id}>
                                <label>
                                    <input type="checkbox"
                                        checked={selectedProduct.includes(phone.brand)}
                                        onChange={() => companyHandler(phone.brand)}
                                    />
                                    {phone.brand}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <ProductCard key={item.id} item={item} linkPath={`/rice-cookers/${item.id}`} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RiceCookerPage
