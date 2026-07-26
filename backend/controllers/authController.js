import asyncHandler from 'express-async-handler';
import User from '../models/User.js';


const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  expires: new Date(
    Date.now() +
      (Number(process.env.JWT_COOKIE_EXPIRES_DAYS) || 7) * 24 * 60 * 60 * 1000,
  ),
});

// @desc    Register a new staff/admin user
// @route   POST /api/auth/register
// @access  Public (in production, restrict this to an existing admin)
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }

    const user = await User.create({ name, email, password, role });
    const token = user.generateAuthToken();

    res
      .status(201)
      .cookie("token", token, cookieOptions())
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Log in staff/admin user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error(
      "This account has been deactivated. Contact the clinic administrator.",
    );
  }

  const token = user.generateAuthToken();

  res
    .status(200)
    .cookie("token", token, cookieOptions())
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});

// @desc    Log out (clear cookie)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
