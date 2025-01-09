import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/db.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config()
connectDB()

app.use(cors());
app.use(express.json());

const PORT =  process.env.PORT||8000;

app.use('/api/v1/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})