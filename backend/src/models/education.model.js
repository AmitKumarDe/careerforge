import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    startYear: {
      type: Number,
      required: true,
      min: 1950,
    },

    endYear: {
      type: Number,
      min: 1950,
      default: null,
    },

    currentlyStudying: {
      type: Boolean,
      default: false,
    },

    grade: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
