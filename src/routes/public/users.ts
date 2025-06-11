import { Router, Request, Response } from 'express';
import User from '../../models/User';

const router = Router();

// Get public user profile
router.get(
  '/profile/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
        return;
      }

      res.json({
        status: 'success',
        data: {
          user: user.toPublicProfile(),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }
);

router.get(
  '/get-all-users',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find();
      res.json({
        status: 'success',
        data: {
          users: users.map(user => user.toPublicProfile()),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }
);

export default router;
