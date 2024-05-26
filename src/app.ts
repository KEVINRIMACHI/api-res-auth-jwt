import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();

app.use(express.json())


// routes
app.use('/auth', authRoutes)
app.use('/product', productRoutes)



export default app