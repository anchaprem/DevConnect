const mongoose=require("mongoose");

const URL="mongodb+srv://anchaprem:ii3xZHNjDykzgrQf@cluster0.i9wtn4b.mongodb.net/devConnect";

//database Connection
const connectDb=async()=>{
    await mongoose.connect(URL);
};


module.exports=connectDb;