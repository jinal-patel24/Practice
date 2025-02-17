import express from "express";
import { addproduct, getproduct } from "../controller/product.js";



const router = express.Router();

router.post('/add', addproduct);
router.get('/get',getproduct)
export default router;