/**
 * অথেন্টিকেশন সার্ভিস (Auth Service):
 * - পাসওয়ার্ড হ্যাশিং (bcrypt) এবং ইউজার রেজিস্ট্রেশন লজিক সম্পাদন করে।
 * - ইমেইল ও পাসওয়ার্ড মিলিয়ে JWT সাইন করে এবং ইউজারের ফুল প্রোফাইল ফেচ করে।
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Restaurant = require("../../models/Restaurant");
const ApiError = require("../../utils/ApiError");

const generateToken = (user, restaurantId = null) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      restaurantId: restaurantId || user.restaurantId,
    },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "7d" }
  );
};

class AuthService {
  async register({ name, email, password, role, restaurantName }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists with this email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // যদি স্পেসিফিক কোনো রোল না দেওয়া থাকে, তবে ওয়েবসাইটে সাইন-আপ করা ব্যক্তি হলেন Restaurant OWNER
    const assignedRole = role === "Manager" || role === "Staff" ? role : "OWNER";

    const cleanRestName = restaurantName || `${name}'s Restaurant`;
    const slug = cleanRestName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.floor(1000 + Math.random() * 9000);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    const restaurant = await Restaurant.create({
      name: cleanRestName,
      slug,
      ownerUserId: user._id,
      email: user.email,
    });

    user.restaurantId = restaurant._id;
    await user.save();

    const token = generateToken(user, restaurant._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 'OWNER'
        restaurantId: user.restaurantId,
        restaurantName: restaurant.name,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    let restaurantName = "";
    if (user.restaurantId) {
      const rest = await Restaurant.findById(user.restaurantId);
      if (rest) restaurantName = rest.name;
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId,
        restaurantName,
      },
      token,
    };
  }

  async getProfile(user) {
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }
}

module.exports = new AuthService();
