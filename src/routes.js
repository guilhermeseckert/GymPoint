import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegistrationController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.post('/students', StudentController.store);
routes.put('/users', UserController.update);
routes.put('/students', StudentController.update);
routes.get('/students', StudentController.index);

// Plan created end update
routes.put('/plans', PlanController.update);
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegisterController.store);
routes.get('/registrations', RegisterController.index);
routes.delete('/registrations/:id', RegisterController.delete);
routes.put('/registrations', RegisterController.update);

export default routes;
