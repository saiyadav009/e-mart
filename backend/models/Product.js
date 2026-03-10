const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    product: { type: String },
    image: { type: String },
    company: { type: String },
    brand: { type: String },
    model: { type: String },
    price: { type: String },
    category: { type: String },
    description: { type: String }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
