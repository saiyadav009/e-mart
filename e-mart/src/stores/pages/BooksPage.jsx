import React, { useState } from 'react'
import { booksData } from '../data/books'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const BooksPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (manga) => {
        if (selectedProduct.includes(manga)) {
            setSelectedProduct(selectedProduct.filter(item => item !== manga))
        } else {
            setSelectedProduct([...selectedProduct, manga])
        }
    }

    const filteredProduct = selectedProduct.length === 0 ? booksData : booksData.filter((oran) => selectedProduct.includes(oran.category))

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {booksData.map((book) => {
                        return (
                            <div className='pro-input' key={book.category || Math.random()}>
                                <label>
                                    <input type="checkbox"
                                        checked={selectedProduct.includes(book.category)}
                                        onChange={() => companyHandler(book.category)}
                                    />
                                    {book.category}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <div key={item.id}>
                                <Link to={`/books/${item.id}`}>
                                    <div className="pageImg">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                </Link>
                                <div className="proModel">
                                    {item.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BooksPage
