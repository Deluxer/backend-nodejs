import { Router } from 'express';
import { deleteUser, getUser, postUser, putUser } from '../controllers/userController.js';
const router = Router();

router.get('/', getUser);
router.put('/:userId', putUser);
router.post('/', postUser);
router.delete('/', deleteUser);

export default router;