import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
// src/server.ts
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                messagem: err.message,
            });
        }
        console.log(err);
        return response.status(500).json({
            status: 'Error',
            message: 'Internal Server Error',
        });
    },
);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log(' Server started on port 3333! =D');
});
