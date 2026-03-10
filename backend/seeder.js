const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Import React Hardcoded Data directly from the frontend directory relative path
const acData = require('../e-mart/src/stores/data/ac').acData;
const computerData = require('../e-mart/src/stores/data/computers').computerData;
const fridgeData = require('../e-mart/src/stores/data/fridge').fridgeData;
const furnitureData = require('../e-mart/src/stores/data/furniture').furnitureData;
const menData = require('../e-mart/src/stores/data/men').menData;
const mobileData = require('../e-mart/src/stores/data/mobiles').mobileData;
const riceData = require('../e-mart/src/stores/data/riceCooker').riceData;
const sneakerData = require('../e-mart/src/stores/data/sneaker').sneakerData;
const watchData = require('../e-mart/src/stores/data/watch').watchData;
const womanData = require('../e-mart/src/stores/data/woman').womanData;

dotenv.config();

// Standardize category names and combine arrays
const allProducts = [
    ...acData.map(item => ({ ...item, category: 'ac' })),
    ...computerData.map(item => ({ ...item, category: 'computers' })),
    ...fridgeData.map(item => ({ ...item, category: 'fridge' })),
    ...furnitureData.map(item => ({ ...item, category: 'furniture' })),
    ...menData.map(item => ({ ...item, category: 'men' })),
    ...mobileData.map(item => ({ ...item, category: 'mobiles' })),
    ...riceData.map(item => ({ ...item, category: 'rice-cookers' })),
    ...sneakerData.map(item => ({ ...item, category: 'sneakers' })),
    ...watchData.map(item => ({ ...item, category: 'watches' })),
    ...womanData.map(item => ({ ...item, category: 'woman' }))
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://user:password@cluster0.mongodb.net/emart?retryWrites=true&w=majority';

const importData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected via Seeder...');

        // Clear existing products so we don't cause duplicate ID errors during re-seeds
        await Product.deleteMany();
        console.log('Existing Products Cleared.');

        await Product.insertMany(allProducts);
        console.log('All E-Mart Product Data Imported Successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

importData();
