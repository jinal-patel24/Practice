import express from 'express';
import { 
    signup, 
    Login, 
    updateStudent, 
    getStudent, 
    deleteStudent, 
    updatePassword 
} from '../controllers/maincontroller.js'; // Import all necessary methods from the merged controller

import validateJWT  from '../helper/jwt.js';
import refreshToken  from '../controllers/authController.js'; // Assuming this is still a separate controller
import authenticate from '../middleware/auth.js'; // Keep middleware as is

const router = express.Router();

// Public routes
router.post('/signup', signup); 
router.post('/login', Login);   

// Protected routes
router.use(validateJWT); // Middleware remains unchanged
router.put('/update',authenticate, updateStudent); 
router.post('/update-password',authenticate, updatePassword); // Update the import source to maincontroller
router.get('/student/getAll', getStudent); 
router.post('/refresh-token', refreshToken); // Assuming this remains in a separate controller
router.delete('/delete/student/:id', deleteStudent); 

export default router;
