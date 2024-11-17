import { Router } from "express";
import {registerUser,loginUser,uploadAssignment,fetchAdmins} from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js";

const router = Router();

//User registration
router.post('/register', registerUser);

//User login
router.post('/login', loginUser);

//Upload assignment
router.post('/upload', protect, uploadAssignment);

//Fetch all admins
router.post('/admins', protect, fetchAdmins)

export default router;