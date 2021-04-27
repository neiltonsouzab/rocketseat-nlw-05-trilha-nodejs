import { Router } from 'express';
import MessagesController from './controllers/MessagesController';

import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

const routes = Router();

routes.post('/settings', settingsController.create);
routes.put('/settings/:id', settingsController.update);
routes.get('/settings/:username', settingsController.findByUsername);

routes.post('/users', usersController.create);

routes.post('/messages', messagesController.create);
routes.get('/messages/:user_id', messagesController.index);

export default routes;