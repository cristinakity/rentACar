const mongoose = require('mongoose');
const Carro = require('../models/Carro');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rentacar')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


module.exports = function (app) {
    // Simple route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // CRUD carros
    app.get('/carro', async (req, res) => {
        try {
            const carros = await Carro.find();
            res.json(carros);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    // Route to get a carro by ID
    app.get('/carro/:id', async (req, res) => {
        try {
            const carroId = req.params.id;

            // Find the carro by ID
            const carro = await Carro.findById(carroId);

            if (!carro) {
                return res.status(404).json({ message: 'Carro no encontrado' });
            }

            res.json(carro);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    app.post('/carro', async (req, res) => {
        console.log(req.body);
        const carro = new Carro(req.body);
        try {
            await carro.save();
            res.status(201).send(carro);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // update a carro
    app.put('/carro/:id', async (req, res) => {
        try {
            const carroId = req.params.id;
            const { codigo, placa, marca, modelo, anio, color } = req.body;

            // Busca al carro por id
            const carroActualizado = await Carro.findByIdAndUpdate(carroId, { codigo, placa, marca, modelo, anio, color }, { new: true });

            if (!carroActualizado) {
                return res.status(404).json({ message: 'Carro no encontrado' });
            }

            res.json(carroActualizado);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    app.delete('/carro/:id', async (req, res) => {
        try {
            const carro = await Carro.findByIdAndDelete(req.params.id);
            if (!carro) {
                return res.status(404).json({ message: 'Carro no encontrada' });
            }
            res.json({ message: 'Carro eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}