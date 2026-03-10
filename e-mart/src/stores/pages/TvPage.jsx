import React, { useState } from 'react'
import { tvData } from '../data/tv'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const TvPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (manga) => {
        if (selectedProduct.includes(manga)) {
            setSelectedProduct(selectedProduct.filter(item => item !== manga))
        } else {
            setSelectedProduct([...selectedProduct, manga])
        }
    }

    const filteredProduct = selectedProduct.length === 0 ? tvData : tvData.filter((oran) => selectedProduct.includes(oran.brand))

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {tvData.map((phone) => {
                        return (
                            <div className='pro-input' key={phone.id || Math.random()}>
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
                            <div key={item.id}>
                                <Link to={`/tv/${item.id}`}>
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

export default TvPage
