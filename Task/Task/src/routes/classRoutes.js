import express from 'express';
import { createClass, getClass, addStudentsToClass } from '../controllers/maincontroller.js';

const router = express.Router();

router.post('/create', createClass);
router.get('/get', getClass);
router.post('/add/:id', addStudentsToClass);

export default router;
