import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        max : 1000
    },
    likes : {
        type : Array,
        default : []
    },
    image : {
        type : String
    },
    comments : {
        type : Array,
        default : []
    }
}, {timestamps : true});

const Posts =  mongoose.model("Posts", postSchema);
export default Posts; 