import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    requiredSkills: {
      type: [String], // skills needed for this career
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

const Career = mongoose.model('Career', careerSchema);

export default Career;
