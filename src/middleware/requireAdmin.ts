import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin privileges required.',
    });
    return;
  }
  next();
};

export default requireAdmin;
