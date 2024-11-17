import User from "../models/User";
import Assignment from "../models/Assignment";
import bcrypt, { hash } from "bcrypt";


//register admin
const registerAdmin = async(req,res)=>{
    const { username,email,password } = req.body;

    try{
        if(!username || !email || !password) res.status(400).json({message:"All fields are required"});

        //if user already exists
        const adminExists = await User.findOne({email});
        if(adminExists) res.status(400).json({message: "admin already exists"});

        //hashing the original password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating user
        const admin = await User.create({username,email,password:hashedPassword,role:"admin"});
        res.status(201).json({message:`successfully registered with user id ${admin._id}`});
    }catch(err){
        res.status(500).json({
            message: err
        })
    } 
}


//login admin
const loginAdmin = async(req,res)=>{
    const { email,password }=req.body;

    try{
        const admin = await User.findOne({email})
        if(!admin || admin.role!=='admin') res.status(400).json({message:"Invalid email or password"});

        const isPasswordCorrect = await bcrypt.compare(password,admin.password);
        if(!isPasswordCorrect) res.status(400).json({message: "Invalid email or password"});

        res.status(200).json({message:"Login successful", adminID:admin._id});
    }catch(err){
        res.status(500).json(err);
    }
}


//View assignments tagged to the admin
const getAssignments = async(req,res)=>{
    req.user = {id:"Admin _id"};
    try{
        const assignments = await Assignment.find({adminId: req.user.id}).populate("userID","username email");
        res.status(200).json(assignments);
    }catch(err){
        res.status(500).json(err);
    }
}


//Accept an assignment
const acceptAssignment = async(req,res)=>{
    try{
        const assignment = await Assignment.findById(req.params.id);
        if(!assignment) return res.status(404).json("Assignment not found");

        assignment.status = 'accepted';
        await assignment.save();

        res.status(200).json("Assignment accepted successfully");
    }catch(err){
        res.status(500).json("Error accepting..  ",err);
    }
}


//Reject an assignment
const rejectAssignment = async(req,res)=>{
    try{
        const assignment = await Assignment.findById(req.params.id);
        if(!assignment) return res.status(404).json("Assignment not found");

        assignment.status = 'rejected';
        res.status(200).json("Assignment rejected");
    }catch(err){
        res.status(500).json("Error rejecting the assignment...  ",err)
    }
}


export {registerAdmin,loginAdmin,getAssignments,acceptAssignment,rejectAssignment}


