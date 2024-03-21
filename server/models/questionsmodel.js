import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question_name:{
        type:String,
        unique:true,
        required:[true,'Question Name is Required']
    },
    question_difficulty:{
        type:String,
        enum:['Hard','Medium','Easy'],
        default:'TBD'
    },
    question_solution:{
        type:String
    },
    question_link:{
        type:[String],
        unique:true
    },

    question_status:{
        type:String,
        enum:['Done','Revisit','Pending'],
        default:"Pending"
    },

    question_notes :{
        type:String
    },

    bookmark:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export default mongoose.model('Questions',questionSchema)