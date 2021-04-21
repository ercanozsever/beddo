import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';

//process.env
dotenv.config();
let port = process.env.PORT || 5000;
let host = process.env.HOST || 'localhost';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Ürün bulunamadı!' })
    }
});


app.get('/', (req, res) => {
    res.send('Server is almost ready');
});
app.listen(port, () => {
    console.log(`Server is running ${host}:${port} `);
});