import connectDB from "./db.js"
import { app } from "./app.js"
import 'dotenv/config';// const app = express()
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8800, ()=>{
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection FAILED !!: ", err)
    throw err
})


