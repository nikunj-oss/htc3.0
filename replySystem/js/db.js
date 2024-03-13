import mongoose from "mongoose"
// import {D} from "../constants.js"


const connectDB = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/HolisticAura`)
        console.log("MogoDB connected !! DB host: " + connectionInstance.connection.host)
    }
    catch(error){
        console.log("MongoDB connection FAILED:" + error)
        process.exit(1)
    }
}
export default connectDB