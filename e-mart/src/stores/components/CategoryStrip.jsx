import React from 'react'
import { Link } from 'react-router-dom'

const CategoryStrip = () => {
    const categories = [
        { name: "Top Offers", image: "/assets/TopOffers/1.png", path: "/" },
        { name: "Mobiles", image: "/assets/Mobiles/2.jpg", path: "/mobiles" },
        { name: "Computers", image: "/assets/Computers/1.jpg", path: "/computers" },
        { name: "Watches", image: "/assets/Watch/2.jpg", path: "/watch" },
        { name: "Furniture", image: "/assets/Furniture/1.jpg", path: "/furniture" },
        { name: "Home & AC", image: "/assets/Ac/1.jpg", path: "/ac" },
        { name: "Sneakers", image: "/assets/sneakers/1.png", path: "/sneakers" },
        { name: "Rice Cookers", image: "/assets/rice_cookers/1.png", path: "/rice-cookers" },
        { name: "Travel", image: "/assets/Travel/1.png", path: "/" },
        { name: "Beauty", image: "/assets/Beauty/1.png", path: "/" },
        { name: "Fans", image: "/assets/Fans/icon.png", path: "/fans" }
    ]

    return (
        <div className="category-strip">
            {categories.map((cat, index) => (
                <Link to={cat.path} key={index} style={{ textDecoration: 'none' }}>
                    <div className="category-item">
                        <img src={cat.image} alt={cat.name} />
                        <span>{cat.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoryStrip
