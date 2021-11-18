import { loginService } from '../../services/auth';
import { Request, Response } from 'express';
import { getUserInfo } from '../../utils';

export const loginCtrl = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    // The result is a response has been response from the Spiderum server
    const result = await loginService({ name, password });
    // After get result from Spiderum server, we need to get the token from the response
    const token =
      result &&
      result.headers['set-cookie'][0]
        .split(`; `)[0]
        .split(`spiderum_token=`)
        .join(``);
    // Then we need to get the user info from the token
    const userInfo = getUserInfo(token);
    // Finally, we need to send the user info to the client
    if (userInfo.id) {
      res.status(200).json(token);
      return;
    }
    // If the user info is not valid, we need to send an error message to the client
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  } catch (error) {
    // If there is an error, we need to send an error message to the client
    res.status(500).json({
      message: error.message,
    });
  }
};
