import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    currentPassword : {
        type : String,
        required : true
    },
    accessToken: {
        type : String,
        default : null,
    },
    refreshToken : {
        type : String,
        default : null,
    }
});

export default mongoose.model("user",userSchema)