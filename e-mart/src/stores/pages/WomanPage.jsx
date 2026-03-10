import React, { useState } from 'react'
import { womanData } from '../data/woman'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const WomanPage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }


    const filteredProduct = selectedProduct.length === 0 ?
        womanData : womanData.filter((orange) => selectedProduct.includes(orange.brand))

    const uniqueCompanies = [...new Set(womanData.map(item => item.brand))]

    return (
        <>
            <Navbar />
            <div className="fullpage">

                <div className="pro-selected">

                    {uniqueCompanies.map((company) => {
                        return (
                            <div className='pro-input' key={company}>
                                <label >
                                    <input type="checkbox"
                                        checked={selectedProduct.includes(company)}
                                        onChange={() => companyHandler(company)}
                                    />
                                    {company}
                                </label>
                            </div>
                        )
                    })}

                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <div className='imgBox' key={item.id}>
                                <Link to={`/woman/${item.id}`} style={{ textDecoration: 'none' }}>
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

export default WomanPage