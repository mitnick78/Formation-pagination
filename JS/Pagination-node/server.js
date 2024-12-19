const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

let currentPage = 1;
const itemsPerPage = 10;

const fetchProduct = async (page = 1, limit = 10) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
    return response.data;
}

function calculateTotalPages(totalItems, itemsPerPage) {
    return Math.ceil(totalItems / itemsPerPage);
}

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const products = await fetchProduct(currentPage, itemsPerPage);
        const totalPages = calculateTotalPages(products.total, itemsPerPage);
        res.render('index', { products: products.products, totalPages, currentPage });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/page/:page', async (req, res) => {
    currentPage = parseInt(req.params.page, 10);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
