import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IUser } from '../interfaces/user';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface JwtPayload {
  id: string;
}

interface AuthRequest extends Request {
  user?: IUser | null;
}

export const protect: RequestHandler = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!,
        ) as JwtPayload;
        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
          req.user = null;
        } else {
          req.user = user;
        }
        next();
      } catch (err) {
        console.error(err);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);

export { AuthRequest };
