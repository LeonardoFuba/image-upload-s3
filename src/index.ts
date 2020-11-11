import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

/**
 * Database setup
 */
mongoose.connect( process.env.MONGO_URL || "mongodb://localhost:27017/upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, "..", "uploads")));

app.listen(3333);
