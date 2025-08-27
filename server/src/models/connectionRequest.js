const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected","connected"],
            message:"{VALUE} is Incorrect"
        }
    }
},
{
    timestamps:true,
});


connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("Cannot send connection request to yourself"));
    }
    next();
});


const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);


module.exports=ConnectionRequestModel;