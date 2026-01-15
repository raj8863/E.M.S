import express from 'express'
import { login, register, updateTaskStatus } from '../controllers/authCountroller.js';
import { createTask, getEmployees } from '../controllers/taskController.js';



const router = express.Router();

// AuthRoutes
router.post('/login', login);
router.post('/register', register); 

// TaskRoutes
router.post('/create-task', createTask);
router.get('/employees', getEmployees);
router.put('/update-task', updateTaskStatus);

export default router;