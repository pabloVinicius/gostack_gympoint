import { Router } from 'express';

import { SessionController, StudentController } from './app/controllers';
import { authMiddleware } from './app/middlewares';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API is running' }));
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/student', StudentController.store);

export default routes;
