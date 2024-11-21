const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua hewan
router.get('/', (req, res) => {
    db.query('SELECT * FROM hewan', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan hewan berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM hewan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Hewan tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan hewan baru
router.post('/', (req, res) => {
    const { name, species, age } = req.body;
    if (!name || !species || !age) {
        return res.status(400).send('Semua field (name, species, age) harus diisi');
    }

    db.query('INSERT INTO hewan (name, species, age) VALUES (?, ?, ?)', [name.trim(), species.trim(), age], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newHewan = { id: results.insertId, name: name.trim(), species: species.trim(), age: age };
        res.status(201).json(newHewan);
    });
});

// Endpoint untuk memperbarui data hewan
router.put('/:id', (req, res) => {
    const { name, species, age } = req.body;

    db.query('UPDATE hewan SET name = ?, species = ?, age = ? WHERE id = ?', [name, species, age, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Hewan tidak ditemukan');
        res.json({ id: req.params.id, name, species, age });
    });
});

// Endpoint untuk menghapus data hewan
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM hewan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Hewan tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;
