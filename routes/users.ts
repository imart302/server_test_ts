import { Router } from 'express';
import { deleteUser, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/users';
import { existsEmail, validatePostBody, validatePutBody } from './users.middleware';

const router = Router();


router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', [validatePostBody, existsEmail], postUsuario);
router.put('/:id', [validatePutBody], putUsuario);
router.delete('/:id', deleteUser);


export default router;