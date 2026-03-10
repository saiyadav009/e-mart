import React, { useState } from 'react'
import { kitchenData } from '../data/kitchen'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const KitchenPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (manga) => {
        if (selectedProduct.includes(manga)) {
            setSelectedProduct(selectedProduct.filter(item => item !== manga))
        } else {
            setSelectedProduct([...selectedProduct, manga])
        }
    }

    const filteredProduct = selectedProduct.length === 0 ? kitchenData : kitchenData.filter((oran) => selectedProduct.includes(oran.brand))

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {Array.from(new Set(kitchenData.map(item => item.brand))).map((brand) => (
                        <div className='pro-input' key={brand}>
                            <label>
                                <input type="checkbox"
                                    checked={selectedProduct.includes(brand)}
                                    onChange={() => companyHandler(brand)}
                                />
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <div key={item.id}>
                                <Link to={`/kitchen/${item.id}`}>
                                    <div className="pageImg">
                                        <img src={item.image} alt={item.model} />
                                    </div>
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

export default KitchenPage
