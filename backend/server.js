const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Helper to load frontend mock data
const loadMockData = (filename, varName) => {
    try {
        const filePath = path.join(__dirname, '../e-mart/src/stores/data', filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const arrayString = content.replace(`export const ${varName} = `, '').trim().replace(/;$/, '');
        return eval(`(${arrayString})`);
    } catch (e) {
        console.warn(`Could not load ${filename}:`, e.message);
        return [];
    }
};

const seedDatabase = async () => {
    const count = await Product.countDocuments();
    if (count > 0) return; // Already seeded

    console.log('Seeding In-Memory Database from frontend data...');
    const allProducts = [
        ...loadMockData('ac.js', 'acData').map(item => ({ ...item, category: 'ac' })),
        ...loadMockData('computers.js', 'computerData').map(item => ({ ...item, category: 'computers' })),
        ...loadMockData('fridge.js', 'fridgeData').map(item => ({ ...item, category: 'fridge' })),
        ...loadMockData('furniture.js', 'furnitureData').map(item => ({ ...item, category: 'furniture' })),
        ...loadMockData('men.js', 'menData').map(item => ({ ...item, category: 'men' })),
        ...loadMockData('mobiles.js', 'mobileData').map(item => ({ ...item, category: 'mobiles' })),
        ...loadMockData('rice_cookers.js', 'riceCookerData').map(item => ({ ...item, category: 'rice-cookers' })),
        ...loadMockData('sneakers.js', 'sneakerData').map(item => ({ ...item, category: 'sneakers' })),
        ...loadMockData('watch.js', 'watchData').map(item => ({ ...item, category: 'watches' })),
        ...loadMockData('woman.js', 'womanData').map(item => ({ ...item, category: 'woman' }))
    ];

    await Product.insertMany(allProducts);
    console.log('Successfully seeded database with', allProducts.length, 'products!');
};

// Start Server and DB
const startServer = async () => {
    try {
        // Spin up an isolated MongoDB memory server instance
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.connect(mongoUri);
        console.log(`In-Memory MongoDB connected successfully at ${mongoUri}`);

        // Seed data automatically
        await seedDatabase();

        app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));
    } catch (error) {
        console.error('Server Initialization Error:', error);
    }
};

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => res.send('E-Mart Backend API inside Memory-DB is running...'));

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

startServer();
