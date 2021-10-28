import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import Users from './routes/users.js';
import Auth from "./routes/auth.js";
import Posts from "./routes/posts.js";
import Message from "./routes/message.js"
import Conversation from "./routes/conversation.js"
import cors from "cors";
import path from "path"




const app = express();
const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`app is running on port ${port}`));


// loading a .env file
dotenv.config();


// connection to mongoDB atlas
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser : true, useUnifiedTopology : true})
.then( () => console.log("connected to mongo Atlas"))
.catch((err) => console.log(err));

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan('common'));
app.use("/api/users" , Users );
app.use("/api/auth" , Auth);
app.use("/api/posts", Posts);
app.use("/api/conversations", Conversation);
app.use("/api/messages", Message);
app.use(cors());    
// ----------------- deployment ---------------

const __dirname  = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req, res) =>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })

}else{

    app.get("/" , (req, res) =>{
        res.send("Root route of app")   
    })

}    



