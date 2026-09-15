import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    employmentType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"],
      default: "FULL_TIME",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1500,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
