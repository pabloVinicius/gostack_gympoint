import { Router } from 'express';

import {
  SessionController,
  StudentController,
  PlanController,
} from './app/controllers';
import { authMiddleware } from './app/middlewares';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API is running' }));
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
