import { Router } from "express";
import {registerAdmin,loginAdmin,getAssignments,acceptAssignment,rejectAssignment} from "../controllers/adminControllers.js"
import protect from "../middleware/authMiddleware.js"

const router = Router();

//Admin registration
router.post('/register',registerAdmin);

//Admin login
router.post('/login',loginAdmin);

//View assignments tagged to admin
router.get('/assignments',protect, getAssignments)

//Accept assignment
router.post('/assignments/:id/accept',protect, acceptAssignment)

//Reject assignment
router.post('/assignments/:id/reject',protect, rejectAssignment)


export default router;