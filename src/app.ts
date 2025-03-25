import express from 'express';
import morgan from 'morgan';
// import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import path from 'path';
import http from 'http';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const server = http.createServer(app);

export default server;
