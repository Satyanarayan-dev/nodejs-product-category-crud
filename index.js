const express = require('express');
const app     = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.redirect('/categories');
});

const categoryRoutes = require('./routes/category');
const productRoutes  = require('./routes/product');

app.use('/categories', categoryRoutes);
app.use('/products',   productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});