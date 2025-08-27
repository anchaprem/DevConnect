const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAACUCAMAAAD8tKi7AAAAMFBMVEXk5ueutLepsLPU2Nnn6eqxt7rGyszS1dfh4+TY29zc3+DAxcfq7O3Lz9G9wsS1u77vo9aMAAAEaklEQVR4nO2cyZbjMAhFZRmNtqT//9uWXZXESWXQgA057btK9+oVBwNCICFOTk5OTk5qAaBW0ADMs3DOZLwX8/xFf4IddZIbonaWWlMBILyJSsrhjvzvyXjB2vwAq8WHJ0iZtGPs/+CzyZ8J/5WvJs9UPIjpte4LmqV4GIc3Nr+5jqMW+gewukD5ql5bXrbPnl4oPYuPnlruFvCpVPlCcnwsD65G+WJ6PvHGFfvLVTwTy1dbfUGxCDfgqnz9QuLwwdryCHNHpBaezV4a1x+ReqaWPjZKz+JH4u/VtirPKNqiHqZmsw/EhVmuv3pQpFE+dmmXE51yMF3SM3QZqjW0czB8SzHwAFl2bU1LG8NThZqe2H4VT5NcO1LqRjtNcp37AuQvE4nhZwSz5/xEIV14FO0DRW5tLn4fCATa56bj0l8mio9V4WiPBJWwx5FOcXDtLH832o//WPtryF+UOV57QNJOEGhAI0mXBNoLLgrYaj/tftr9f9L+zTESTTtBbsKqCSiaYx6pjiS5RPjiGhjr7BFJznw42km6S/U3k08hadDg9DgGAuVYDh9JektgMHp6x2emFYuhnerWBqGHTdOOFBh3B5Ls7qD/zobuYr67lpQjmXZh+8KkpKhlLnQ2mBTpRAF0eTxJC/imvSfGK+JhQwjtMyhEKXVD6ySHpKlk7miNNYlauFgO3U2HP8Vh1q0tUNKGxw31xTD5rNiV6kqeQYi5UttocvQh5gaMqdz0nMawF8CXxnnJb+kDRCjbmTAsV4X8Z7+RLEaYnwDz+CHHJlYf6T0A5uWGk1TRMN7NEovbj2HZ5XsUPkQ9snT0O0BYZ+LdLqKKwVn+ym94E4LWIYxMv87XwMKcWX9QqyliFWqt9c658Yf8y3tvBec/YlHmncl+EmNKSl2q+vwrpRQnHUx2H376YQbrwip5+BtkfvJp/t/8R0RtPPDZgc6mNLrm4JfDjmVg/uzc/lk8/8CyAz2SbnsA+DUR1em+yld0K9zLbnYsKR3fyE+Tscc7/yxCRLgclkPS/tj6DATWBMpCPO4clcO4bnTyF8h0zNsLAE53eflz9dHs31gFr989QdAufojjvjEfICBNQDxRr+Kepm9csy1nt/Gr8icImslH8X3U17SP2gl7RBzMiP6OiG16EDt7+haDmmgBa8mgCNxFOYxpkxrxiHfGaGOc5eKRnB5t8rdGfELJUzOB9EU8wrEEa32sGgTLU0lHaHcf/pluxPdFG7Rh60bxPV6DsdXcIz60Z1hAGrVuF998ku17bAOF1qkDtI29HhofX6h7d2svTJP29okkTFJLoERaJe9F6nrpfRN4iMhqwwMTs7fMlWFtoiBQ+4DdsYe8D1TOmQPKWxtIVCYoHrH9QlW7DG/REIWqYrh7KB+XqnVFXi6Ta+EKlzm4H/ORmtUKskPqC2pe3uMUIRcq1nEs9XnpEVleCbOpZS5UdFcxHt/CpbxjwOPUsUWVas9nbHYU292ZkRk1p1ZgRoX0k5MTbvwD+KxB2B0JOnUAAAAASUVORK5CYII="
    },
    about:{
        type:String,
        default:"This is default description of the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});


userSchema.index({firstName:1,lastName:1});  //indexing makes db response


//these are methods in the schema
userSchema.methods.getJWT = async function() {
    const token = await jwt.sign(
        { _id: this._id }, 
        config.jwtSecret, 
        { expiresIn: config.jwtExpiresIn }
    );
    return token;
}

userSchema.methods.encryptPassword = async function(passwordInputByUser) {
    const passwordHash = await bcrypt.hash(passwordInputByUser, 10);
    this.password = passwordHash;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, this.password);
    return isPasswordValid;
}


module.exports=mongoose.model("User",userSchema);