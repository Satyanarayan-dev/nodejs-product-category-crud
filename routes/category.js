const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Category';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send('Server error');
        }
        res.render('categoryList', {
            categories    : results,
            successMessage: req.query.success || null
        });
    });
});

router.get('/add', (req, res) => {
    res.render('categoryForm', {
        isEdit  : false,
        category: {}
    });
});

router.get('/edit/:id', (req, res) => {
    const categoryId = req.params.id;

    db.query('SELECT * FROM Category WHERE CategoryId = ?', [categoryId], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(404).send('Category not found');

        res.render('categoryForm', {
            isEdit  : true,
            category: results[0]  // pre-fill form with existing data
        });
    });
});

router.post('/', (req, res) => {
    const categoryName = req.body.CategoryName;

    if (!categoryName || categoryName.trim() === '') {
        return res.status(400).send('CategoryName is required');
    }

    db.query('INSERT INTO Category (CategoryName) VALUES (?)', [categoryName], (err) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).send('Server error');
        }
        res.redirect('/categories?success=Category added successfully');
    });
});

router.post('/update/:id', (req, res) => {
    const categoryId   = req.params.id;
    const categoryName = req.body.CategoryName;

    if (!categoryName || categoryName.trim() === '') {
        return res.status(400).send('CategoryName is required');
    }

    db.query(
        'UPDATE Category SET CategoryName = ? WHERE CategoryId = ?',
        [categoryName, categoryId],
        (err) => {
            if (err) {
                console.error('Error updating category:', err);
                return res.status(500).send('Server error');
            }
            res.redirect('/categories?success=Category updated successfully');
        }
    );
});

router.post('/delete/:id', (req, res) => {
    const categoryId = req.params.id;

    db.query('DELETE FROM Category WHERE CategoryId = ?', [categoryId], (err) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).send('Server error');
        }
        res.redirect('/categories?success=Category deleted successfully');
    });
});

module.exports = router;
