import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//process.env
dotenv.config();
let port = process.env.PORT || 5000;
let host = process.env.HOST || 'localhost';
let mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/beddo';

mongoose.connect(mongodbUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server is almost ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
});

app.listen(port, () => {
    console.log(`Server is running ${host}:${port} `);
});