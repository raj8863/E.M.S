import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes/api.js' 

dotenv.config();

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));