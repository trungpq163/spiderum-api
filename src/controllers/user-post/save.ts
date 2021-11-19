/* eslint-disable @typescript-eslint/no-explicit-any */
import { savePostService } from '../../services/user-post';
import { Request, Response } from 'express';

export const savePostCtrl = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  const token = (req as any).token;

  try {
    const result = await savePostService({ post_id, token });
    if (result.status === 200) {
      res.status(200).json({
        status: 200,
        message: 'Post saved successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      ...error,
    });
  }
};
