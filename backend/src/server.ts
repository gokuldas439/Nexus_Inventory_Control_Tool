import express, { NextFunction, Response } from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


declare global {
    namespace Express {
      interface Request {
        user: {

        } | null
      }
    }
  }

// require('express-async-errors');
import companyRouter from './routes/company';
import adminRouter from './routes/admin';
import userRouter from './routes/user';
import errorHandler from './middlewares/errorMiddleware'
import { connectDB } from './config/db';
import 'express-async-errors'
const port = process.env.PORT || 5000;

connectDB();



const app = express();


app.use(morgan('dev'));

app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',userRouter)
app.use('/company',companyRouter)
app.use('/admin',adminRouter)

app.use('*',(req,res:Response,next:NextFunction)=>{
    res.statusCode=404;
    throw new Error('Page Not Found')
})

app.use(errorHandler);

app.listen(port, () => console.log("\x1b[36m%s\x1b[0m",`Server started on port ${port}`));
