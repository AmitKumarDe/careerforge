import {
  createExperience,
  getUserExperiences,
  updateExperience,
  deleteExperience,
} from "../services/experience.service.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addExperience = asyncHandler(async (req, res) => {
  const experience = await createExperience(req.user._id, req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, { experience }, "Experience added successfully"),
    );
});

const getMyExperiences = asyncHandler(async (req, res) => {
  const experiences = await getUserExperiences(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { experiences }, "Experience fetched successfully"),
    );
});

const editExperience = asyncHandler(async (req, res) => {
  const experience = await updateExperience(
    req.params.id,
    req.user._id,
    req.body,
  );

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { experience }, "Experience updated successfully"),
    );
});

const removeExperience = asyncHandler(async (req, res) => {
  const experience = await deleteExperience(req.params.id, req.user._id);

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Experience deleted successfully"));
});

export { addExperience, getMyExperiences, editExperience, removeExperience };
