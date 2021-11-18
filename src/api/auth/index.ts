import express from 'express';
import { loginCtrl } from '../../controllers/auth';

const router = express.Router();

router.route('/login').post(loginCtrl);

export default router;
