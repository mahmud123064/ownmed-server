import express from "express";
import { protect, authorizeRoles } 
  from "../middleware/auth.middleware.js";

const router = express.Router();

// profile route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// user dashboard
router.get(
  "/user-dashboard",
  protect,
  authorizeRoles("user"),
  (req, res) => {
    res.json({ message: "Welcome User Dashboard" });
  }
);

// doctor dashboard
router.get(
  "/doctor-dashboard",
  protect,
  authorizeRoles("doctor"),
  (req, res) => {
    res.json({ message: "Welcome Doctor Dashboard" });
  }
);

// admin dashboard
router.get(
  "/admin-dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

export default router;
