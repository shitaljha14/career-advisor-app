import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Career from "./models/Career.js";
import aiMatchRoutes from "./routes/ai-match.js";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Ping endpoint
app.get("/ping", (req, res) => res.json({ message: "Backend working ✅" }));

// ✅ AI route
app.use("/ai-match", aiMatchRoutes);

// ✅ Contact form route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,     // your email
        pass: process.env.PASSWORD,  // app password for Gmail
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,        // your email
      subject: `Contact form message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email", error: err.message });
  }
});

// ✅ Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
