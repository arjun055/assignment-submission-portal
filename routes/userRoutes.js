import { Router } from "express";
import {registerUser,loginUser,uploadAssignment,fetchAdmins} from "../controllers/userControllers.js"

const router = express();

//User registration
router.post('/register', registerUser);

//User login
router.post('/login', loginUser);

//Upload assignment
router.post('/upload', uploadAssignment);

//Fetch all admins
router.post('/admins', fetchAdmins)

export default router;