import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

// Import all data
import { mobileData } from '../data/mobiles'
import { computerData } from '../data/computers'
import { acData } from '../data/ac'
import { fridgeData } from '../data/fridge'
import { furnitureData } from '../data/furniture'
import { menData } from '../data/men'
import { womanData } from '../data/woman'
import { watchData } from '../data/watch'
import { booksData } from '../data/books'
import { speakerData } from '../data/speaker'
import { tvData } from '../data/tv'

const SearchPage = () => {
    const { term } = useParams()
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const allProducts = [
            ...mobileData,
            ...computerData,
            ...acData,
            ...fridgeData,
            ...furnitureData,
            ...menData,
            ...womanData,
            ...watchData,
            ...booksData || [],
            ...speakerData || [],
            ...tvData || []
        ]

        if (term) {
            const lowerTerm = term.toLowerCase()
            const results = allProducts.filter(item => {
                // Helper to safely check fields
                const check = (val) => val && val.toLowerCase().includes(lowerTerm)

                return (
                    check(item.company) ||
                    check(item.model) ||
                    check(item.product) || // e.g. "Air Conditioner", "Mobile"
                    check(item.title) ||   // e.g. Books
                    check(item.category) ||
                    check(item.description)
                )
            })
            setFilteredData(results)
        }
    }, [term])

    return (
        <>
            <Navbar />
            <div className="fullpage" style={{ marginTop: '20px' }}>
                <div className='pageSection' style={{ width: '100%', marginLeft: 0 }}>
                    {filteredData.length === 0 ? (
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <h3>No products found for "{term}"</h3>
                        </div>
                    ) : (
                        filteredData.map((item) => {
                            // Helper to determine path based on product type
                            const getLinkPath = (itm) => {
                                const type = itm.product ? itm.product.toLowerCase() : ''
                                const cat = itm.category ? itm.category.toLowerCase() : ''
                                const title = itm.title ? itm.title.toLowerCase() : ''

                                if (type.includes("mobile")) return `/mobiles/${itm.id}`
                                if (type.includes("computer") || type.includes("laptop")) return `/computers/${itm.id}`
                                if (type.includes("watch")) return `/watch/${itm.id}`
                                if (type.includes("ac") || type.includes("air conditioner")) return `/ac/${itm.id}`
                                if (type.includes("fridge") || type.includes("refrigerator")) return `/fridge/${itm.id}`
                                if (type.includes("mens") || cat.includes("men")) return `/men/${itm.id}`
                                if (type.includes("woman") || cat.includes("woman")) return `/woman/${itm.id}`
                                if (type.includes("furniture")) return `/furniture/${itm.id}`
                                if (title) return `/books/${itm.id}` // Assuming only books have title main field

                                return `/men/${itm.id}` // Default fallback
                            }

                            return (
                                <ProductCard key={item.id} item={item} linkPath={getLinkPath(item)}>
                                    <div className="proModel">
                                        {item.company} {item.model}
                                    </div>
                                </ProductCard>
                            )
                        })
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default SearchPage
