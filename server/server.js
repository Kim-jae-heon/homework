import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './router/index.js';

dotenv.config();
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(5000, () => {
    console.log('5000번 포트 작동');
})