import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  next();
};
