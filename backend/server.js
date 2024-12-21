import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import express from "express";
import productRoutes from "./routes/routes.js";

const PORT = 5000;
const app = express();
app.use(express.json());

app.use("/api/products/", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("<p>Home</p>");
});