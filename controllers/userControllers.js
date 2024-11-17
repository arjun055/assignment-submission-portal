import User from "../models/User";
import Assignment from "../models/Assignment";
import bcrypt, { hash } from "bcrypt";


//Register User
const registerUser = async(req,res)=>{
    const { username,email,password } = req.body;

    try{
        if(!username || !email || !password) res.status(400).json({message:"All fields are required"});

        //if user already exists
        const userExists = await User.findOne({email});
        if(userExists) res.status(400).json({message: "User already exists"});

        //hashing the original password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating user
        const user = await User.create({username,email,password:hashedPassword,role:"user"});
        res.status(201).json({message:`successfully registered with user if ${user._id}`});
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
    
}


//Login user
const loginUser = async(req,res)=>{
    const { email,password }=req.body;

    try{
        const user = await User.findOne({email})
        if(!user) res.status(400).json({message:"Invalid email or password"});

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) res.status(400).json({message: "Invalid email or password"});

        res.status(200).json({message:"Login successful", userID:user._id});
    }catch(err){
        res.status(500).json(err);
    }
}

//upload assignment
const uploadAssignment = async(req,res)=>{
    const {task,adminId} = req.body;

    try{
        if(!task || !adminId) res.status(400).json({message: "Both task and adminId are required"});

        const assignment = await Assignment.create({
            userId: req.body.id,
            task: task,
            adminId: adminId
        });

        res.status(201).json({message:"Assignment uploaded successfully",assignment});
    }catch(err){
        res.status(500).json(err);
    }
}


//fetch all admins
const fetchAdmins = async(req,res)=>{
    try{
        const admins = await User.find({role: "admin"}).select("username email")
        res.status(200).json(admins);
    }catch(err){
        res.status(500).json(err);
    }
}

export {registerUser,loginUser,uploadAssignment,fetchAdmins}