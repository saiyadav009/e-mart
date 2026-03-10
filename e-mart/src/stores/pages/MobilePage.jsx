import React, { useState } from 'react'
import { mobileData } from '../data/mobiles'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const MobilePage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }


    const filteredProduct = selectedProduct.length === 0 ?
        mobileData : mobileData.filter((orange) => selectedProduct.includes(orange.company))

    const uniqueCompanies = [...new Set(mobileData.map(item => item.company))]

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
                                <Link to={`/mobiles/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <img className="proImage" src={item.image} alt="" />
                                </Link>
                                <div className="proModel">
                                    {item.company}, {item.model}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default MobilePage