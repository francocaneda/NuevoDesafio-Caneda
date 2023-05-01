import 'dotenv/config.js'
import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import {initializePassport} from './config/passport.js'
import cors from 'cors'
import routerIndex from './routes/index.routes.js';

const whiteList = ['http://localhost:3000'] 

//Iniciar Server
const app = express()

//MIDDLEWARES
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
// app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 500
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//Mongoose
const connectionMongoose = async () => {
    await mongoose.connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

connectionMongoose()

app.use(cookieParser(process.env.JWT_SECRET))


app.use("/",routerIndex)


app.listen(4000, () => {
    console.log(`Server on port 4000`)
})
