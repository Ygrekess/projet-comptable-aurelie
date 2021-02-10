import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import poleRouter from './routes/poleRoutes.js'
import specialiteRouter from './routes/specialiteRoutes.js'

dotenv.config();

const app = express();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to DB')
)

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* api */
app.use('/api/auth', authRoutes)
app.use('/api/poles', poleRouter)
app.use('/api/specialites', specialiteRouter)

app.listen(process.env.PORT || 5000, () => {
	console.log(`Votre serveur a démarré sur le port ${process.env.PORT}`)
})