import { studentMW } from "../middleware/studentMW.js";
import express from "express";
import { addstudent, deletestudent, getstudent, loginstudent, updatestudent } from "../controller/student.js";
import { verified } from "../middleware/verifyMW.js";


const router = express.Router()
router.post('/add', studentMW , addstudent);
router.post('/login', loginstudent);
router.delete('/delete', deletestudent);
router.patch('/update', updatestudent);
router.get('/find',verified, getstudent);
export default router;