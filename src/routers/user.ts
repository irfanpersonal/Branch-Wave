import express from 'express';
const router: express.Router = express.Router();

import {showCurrentUser, getAllUsers, getSingleUser, updateUser, updateUserPassword} from '../controllers/user';
import {getLinksForUser} from '../controllers/link';
import {authentication} from '../middleware/authentication';

router.route('/').get(getAllUsers);
router.route('/showCurrentUser').get(authentication, showCurrentUser);
router.route('/updateUser').patch(authentication, updateUser);
router.route('/updateUserPassword').patch(authentication, updateUserPassword);
router.route('/:id/getLinksForUser').get(getLinksForUser);
router.route('/:id').get(getSingleUser);

export default router;