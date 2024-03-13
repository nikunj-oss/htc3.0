

import express from "express"
import commentRouter from "./routes/comments.js"
import mongoose from "mongoose"


const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/commentSystem', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/comments', commentRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export {app}
