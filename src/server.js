import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from 'express-session';
import routes from "./routes/index.js"
import { cleanupRejectedFriendRequests } from './utils/friendRequestUtility.js';
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.secret, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, 
      httpOnly: true, 
      secure: false, //true for HTTPS
    }
  }));
app.use(helmet());
app.use(morgan("common"));


//connect to Database
connectDB();

//Routes
app.use('/api/v1.0', routes);

//clean friend request reject
cleanupRejectedFriendRequests();

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});


