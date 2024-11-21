const express = require('express');
const router = express.Router();

// Data hewan contoh
let hewan = [
    {
        id: 1, name: 'Kucing', species: 'Felidae', age: 2
    },
    {
        id: 2, name: 'Anjing', species: 'Canidae', age: 3
    },
];

// Endpoint untuk mendapatkan data hewan
router.get('/', (req, res) => {
    res.json(hewan);
});

// Endpoint untuk menambahkan data hewan
router.post('/', (req, res) => {
    const newHewan = {
        id: hewan.length + 1,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };
    hewan.push(newHewan);
    res.status(201).json(newHewan);
});

// Endpoint untuk menghapus data hewan berdasarkan ID
router.delete('/:id', (req, res) => {
    const hewanIndex = hewan.findIndex(h => h.id === parseInt(req.params.id));
    if (hewanIndex === -1) return res.status(404).json({ message: 'Hewan tidak ditemukan' });

    const deletedHewan = hewan.splice(hewanIndex, 1)[0];
    res.status(200).json({ message: `Hewan '${deletedHewan.name}' telah dihapus` });
});

// Endpoint untuk memperbarui data hewan berdasarkan ID
router.put('/:id', (req, res) => {
    const hewanToUpdate = hewan.find(h => h.id === parseInt(req.params.id));
    if (!hewanToUpdate) return res.status(404).json({ message: 'Hewan tidak ditemukan' });

    hewanToUpdate.name = req.body.name || hewanToUpdate.name;
    hewanToUpdate.species = req.body.species || hewanToUpdate.species;
    hewanToUpdate.age = req.body.age || hewanToUpdate.age;

    res.status(200).json({
        message: `Hewan dengan ID ${hewanToUpdate.id} telah diperbarui`,
        updatedHewan: hewanToUpdate
    });
});

module.exports = router;
