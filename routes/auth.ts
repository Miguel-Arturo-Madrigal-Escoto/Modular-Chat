import { Router } from 'express';
import { signUpController, updateUserController } from '../controllers/auth';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();

router.post('/sign-up', validateJWT, signUpController);
router.patch('/user', validateJWT, updateUserController);

export default router;