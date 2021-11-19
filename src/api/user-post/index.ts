import express from 'express';
import {
  savePostCtrl,
  unSavePostCtrl,
  voteAndUnVoteCtrl,
} from '../../controllers/user-post';

import { verifyToken } from '../../middlewares';

const router = express.Router();

// @route   POST api/user-post/save-post
router.route('/save').post(verifyToken, savePostCtrl);

// @route   POST api/user-post/un-save-post
router.route('/unsave').post(verifyToken, unSavePostCtrl);

// @route   POST api/user-post/vote
router.route('/vote').post(verifyToken, voteAndUnVoteCtrl);

export default router;
