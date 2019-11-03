import { Router } from 'express';

import { SessionController } from './app/controllers';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API OK' }));
routes.post('/session', SessionController.store);

export default routes;
