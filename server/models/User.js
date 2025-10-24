import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String], // User’s input skills
  savedCareers: [
    {
      title: String,
      description: String,
      requiredSkills: [String],
      averageSalary: String,
    },
  ],
  badges: [String], // Gamification badges
  quizHistory: [
    {
      skills: [String],
      date: { type: Date, default: Date.now },
      matchedCareers: [String],
    },
  ],
});

export default mongoose.model("User", UserSchema);
