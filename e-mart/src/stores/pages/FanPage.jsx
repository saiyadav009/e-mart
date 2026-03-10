import React, { useState } from 'react'
import { fansData } from '../data/fans'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const FanPage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const brandHandler = (brand) => {
        if (selectedProduct.includes(brand)) {
            setSelectedProduct(selectedProduct.filter(item => item !== brand))
        } else {
            setSelectedProduct([...selectedProduct, brand])
        }
    }


    const filteredProduct = selectedProduct.length === 0 ?
        fansData : fansData.filter((item) => selectedProduct.includes(item.brand))

    const uniqueBrands = [...new Set(fansData.map(item => item.brand))]

    return (
        <>
            <Navbar />
            <div className="fullpage">

                <div className="pro-selected">
                    {uniqueBrands.map((brand) => {
                        return (
                            <div className='pro-input' key={brand}>
                                <label >
                                    <input type="checkbox"
                                        checked={selectedProduct.includes(brand)}
                                        onChange={() => brandHandler(brand)}
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
                            <div className='imgBox' key={item.id}>
                                <Link to={`/fans/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <img className="proImage" src={item.image} alt="" />
                                </Link>
                                <div className="proModel">
                                    {item.brand}, {item.model}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default FanPage
