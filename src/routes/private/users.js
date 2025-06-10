const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Private routes for users (requires authentication)

// Get user's own profile
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      status: 'success',
      data: {
        user: user.toPublicProfile(),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// Update user's own profile
router.put('/me', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-__v');

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
});

// Delete user's own account
router.delete('/me', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({
      status: 'success',
      message: 'Account deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router;
