import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
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
app.use(cors());
app.use(helmet());
app.use(morgan("common"));


//connect to Database
connectDB();

//Routes
app.use('/api/v1.0', routes);

//clean friend request reject
cleanupRejectedFriendRequests();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(  "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
}); 

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});


