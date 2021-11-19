/* eslint-disable @typescript-eslint/no-explicit-any */
import { voteAndUnVotePostService } from '../../services/user-post';
import { Request, Response } from 'express';

export const voteAndUnVoteCtrl = async (req: Request, res: Response) => {
  const { post_id, action } = req.body;
  const token = (req as any).token;

  try {
    const result = await voteAndUnVotePostService({ post_id, token, action });
    if (result.status === 200) {
      res.status(200).json({
        status: 200,
        message: 'Action successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      ...error,
    });
  }
};
