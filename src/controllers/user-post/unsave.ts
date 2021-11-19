/* eslint-disable @typescript-eslint/no-explicit-any */
import { unSavePostService } from '../../services/user-post';
import { Request, Response } from 'express';

export const unSavePostCtrl = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  const token = (req as any).token;

  try {
    const result = await unSavePostService({ post_id, token });
    if (result.status === 200) {
      res.status(200).json({
        status: 200,
        message: 'Post unsaved successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      ...error,
    });
  }
};
