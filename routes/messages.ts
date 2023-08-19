import { Router } from 'express';
import { chatMessagesController } from '../controllers/messages';

const router = Router();

router.get('/:to', chatMessagesController);

export default router;