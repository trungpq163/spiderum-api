import express from 'express';
import { getPostDetailsCtrl } from '../../controllers/post-details';

const router = express.Router();

router.route('/:slug').get(getPostDetailsCtrl);

export default router;
