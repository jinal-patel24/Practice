import express from "express";

import { addcategory, getcategory } from "../controller/category.js";

const router = express.Router()

router.post('/add', addcategory);
router.get('/get',getcategory)
export default router;