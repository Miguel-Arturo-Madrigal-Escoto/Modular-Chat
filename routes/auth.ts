import { Router } from 'express';
import { signUpController } from '../controllers/auth';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();

router.post('/sign-up', validateJWT, signUpController);

export default router;