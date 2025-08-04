import express from 'express';
import { getAllSubscribers, subscribe, unsubscribe } from './subscriber/controller';
import { createNewsLetter, getAllNewsletters } from './newsletter/controller';

const subRouter = express.Router();
subRouter.post('/createNewsLetter', createNewsLetter);
subRouter.get('/allNewsLetter', getAllNewsletters);
subRouter.post('/subscribe/:id', subscribe);
subRouter.post('/unsubscribe/:id',unsubscribe);
subRouter.get('/allSubscriber', getAllSubscribers);

export default subRouter;