import express from "express";
import dotenv from "dotenv"
import studentRouter from "./routes/studentRoutes.js";
import categoryRouter from "./routes/categotyRoutes.js";
import productRouter from "./routes/productRoutes.js";


const app = express()
app.use(express.json());
dotenv.config();

app.use("/student", studentRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)

app.listen(process.env.PORT, () => {
       console.log(`Server is running on ${process.env.PORT}....`);      
});
