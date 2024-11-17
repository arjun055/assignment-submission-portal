import { Router } from "express";
import {registerAdmin,loginAdmin,getAssignments,acceptAssignment,rejectAssignment} from "../controllers/adminControllers.js"

const router = express();

//Admin registration
router.post('/register',registerAdmin);

//Admin login
router.post('/login',loginAdmin);

//View assignments tagged to admin
router.get('/assignments',getAssignments)

//Accept assignment
router.post('/assignments/:id/accept',acceptAssignment)

//Reject assignment
router.post('/assignments/:id/reject',rejectAssignment)


export default router;