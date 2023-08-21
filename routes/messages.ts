import { Router } from 'express';
import { chatMessagesController } from '../controllers/messages';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();

router.get('/:to', validateJWT, chatMessagesController);

export default router;