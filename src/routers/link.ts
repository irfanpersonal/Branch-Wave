import express from 'express';
const router: express.Router = express.Router();

import {createLink, updateLink, deleteLink} from '../controllers/link';
import {authentication} from '../middleware/authentication';

router.route('/').post(authentication, createLink);
router.route('/:id').patch(authentication, updateLink).delete(authentication, deleteLink);

export default router;