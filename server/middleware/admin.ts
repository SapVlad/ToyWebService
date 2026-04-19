import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { prisma } from '../index';

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  next();
};
