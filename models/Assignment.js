import mongoose, { mongo } from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:String,
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('Assignment',assignmentSchema);