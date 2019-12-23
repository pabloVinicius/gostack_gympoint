import { Router } from 'express';

import {
  SessionController,
  StudentController,
  PlanController,
  RegistrationController,
  CheckinController,
  HelpOrderController,
  GymHelpOrderController,
  UserController,
} from './app/controllers';
import { authMiddleware } from './app/middlewares';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API is running' }));

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/students/:id/checkin', CheckinController.store);
routes.get('/students/:id/checkin', CheckinController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

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

routes.get('/help-orders', GymHelpOrderController.index);
routes.put('/help-orders/:id', GymHelpOrderController.update);

routes.all('*', (req, res) => {
  return res.status(400).json({ error: 'Route not found' });
});

export default routes;
