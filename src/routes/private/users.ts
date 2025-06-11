import { Router, Response } from 'express';
import User from '../../models/User';
import { AuthRequest } from '../../types';

const router = Router();

// Get user's own profile
router.get('/me', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);
    res.json({
      status: 'success',
      data: {
        user: user?.toPublicProfile(),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
});

// Update user's own profile
router.put('/me', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updates: { [key: string]: string } = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

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
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
});

// Delete user's own account
router.delete('/me', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.user?._id);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Account deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
});

export default router;
