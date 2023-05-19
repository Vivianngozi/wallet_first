import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
import bodyParser from 'body-parser';
import DB from './model/db.js';

import {router as indexRouter} from './routes/index.js';
import {transfer} from '../controllers/transactions.js';
DB.connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);

app.get('/health', (req, res)=>{
    res.status(200).json({
        "message": "server is running"
    });
});

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server started')
})