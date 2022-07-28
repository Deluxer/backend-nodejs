import { Router } from 'express';
import { check } from 'express-validator';
import { deleteUser, getUser, postUser, putUser } from '../controllers/userController.js';
import { existEmail, findUserById, isRoleValid } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import Role from '../models/role.js';
const router = Router();

router.get('/', getUser);
router.put('/:id', [
    check('id',' ID is not valid').isMongoId(),
    check('id').custom( findUserById ),
    check('rol').custom( isRoleValid ),
    validateFields
], putUser);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and more 6 chacaters').isLength({ min: 6 }),
    //check('email', 'Eamil is not valid').isEmail(),
    //check('rol', 'Rol is required').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( (rol) => isRoleValid(rol) ),
    check('email').custom( ( email ) => existEmail(email) ),
    validateFields,
], postUser);
router.delete('/:id',[
    check('id',' ID is not valid').isMongoId(),
    check('id').custom( findUserById ),
    validateFields
], deleteUser);

export default router;