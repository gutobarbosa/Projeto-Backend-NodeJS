import express from 'express';
// src/server.ts
import routes from './routes';

const app = express();
app.use(routes);
app.use(express.json());

app.listen(3333, () => {
    console.log(' Server started on port 3333! =D');
});
