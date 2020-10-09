// src/routes/index.ts
import { Router } from 'express';

const routes = Router();
routes.get('/', (request, response) => {
    return response.json({message: "hello world"});
});

export default routes;
