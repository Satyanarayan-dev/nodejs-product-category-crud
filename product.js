const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
    const page     = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const offset   = (page - 1) * pageSize;

    // get total count first
    db.query('SELECT COUNT(*) AS total FROM Product', (err, countResult) => {
        if (err) {
            console.error('Error counting products:', err);
            return res.status(500).send('Server error');
        }

        const totalProducts = countResult[0].total;
        const totalPages    = Math.ceil(totalProducts / pageSize);

        const sql = `
            SELECT
                p.ProductId,
                p.ProductName,
                p.CategoryId,
                c.CategoryName
            FROM Product p
            JOIN Category c ON p.CategoryId = c.CategoryId
            ORDER BY p.ProductId ASC
            LIMIT ? OFFSET ?
        `;

        db.query(sql, [pageSize, offset], (err, products) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).send('Server error');
            }

            res.render('productList', {
                products,
                successMessage: req.query.success || null,
                pagination: {
                    currentPage  : page,
                    pageSize     : pageSize,
                    totalProducts: totalProducts,
                    totalPages   : totalPages,
                    hasPrevPage  : page > 1,
                    hasNextPage  : page < totalPages
                }
            });
        });
    });
});

router.get('/add', (req, res) => {
    db.query('SELECT CategoryId, CategoryName FROM Category', (err, categories) => {
        if (err) return res.status(500).send('Server error');

        res.render('productForm', {
            isEdit    : false,
            product   : {},
            categories: categories
        });
    });
});

router.get('/edit/:id', (req, res) => {
    const productId = req.params.id;

    db.query('SELECT * FROM Product WHERE ProductId = ?', [productId], (err, productResult) => {
        if (err) return res.status(500).send('Server error');
        if (productResult.length === 0) return res.status(404).send('Product not found');

        db.query('SELECT CategoryId, CategoryName FROM Category', (err, categories) => {
            if (err) return res.status(500).send('Server error');

            res.render('productForm', {
                isEdit    : true,
                product   : productResult[0],  // pre-fill form with existing data
                categories: categories
            });
        });
    });
});

router.post('/', (req, res) => {
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
        return res.status(400).send('All fields are required');
    }

    db.query(
        'INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)',
        [ProductName, CategoryId],
        (err) => {
            if (err) {
                console.error('Error adding product:', err);
                return res.status(500).send('Server error');
            }
            res.redirect('/products?success=Product added successfully');
        }
    );
});

router.post('/update/:id', (req, res) => {
    const productId              = req.params.id;
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
        return res.status(400).send('All fields are required');
    }

    db.query(
        'UPDATE Product SET ProductName = ?, CategoryId = ? WHERE ProductId = ?',
        [ProductName, CategoryId, productId],
        (err) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).send('Server error');
            }
            res.redirect('/products?success=Product updated successfully');
        }
    );
});

router.post('/delete/:id', (req, res) => {
    const productId = req.params.id;

    db.query('DELETE FROM Product WHERE ProductId = ?', [productId], (err) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send('Server error');
        }
        res.redirect('/products?success=Product deleted successfully');
    });
});

module.exports = router;