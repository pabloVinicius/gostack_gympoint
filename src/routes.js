import { Router } from 'express';

import {
  SessionController,
  StudentController,
  PlanController,
  RegistrationController,
  CheckinController,
} from './app/controllers';
import { authMiddleware } from './app/middlewares';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API is running' }));
routes.post('/session', SessionController.store);

routes.post('/students/:id/checkin', CheckinController.store);
routes.get('/students/:id/checkin', CheckinController.index);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
