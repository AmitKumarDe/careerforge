import {
  createEducation,
  deleteEducation,
  getUserEducations,
  updateEducation,
} from "../services/education.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addEducation = asyncHandler(async (req, res) => {
  const education = await createEducation(req.user._id, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, { education }, "Education added successfully"));
});

const getMyEducations = asyncHandler(async (req, res) => {
  const educations = await getUserEducations(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { educations }, "Education fetched successfully"),
    );
});

const updateMyEducation = asyncHandler(async (req, res) => {
  const education = await updateEducation(
    req.params.id,
    req.user._id,
    req.body,
  );

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { education }, "Education updated successfully"),
    );
});

const removeEducation = asyncHandler(async (req, res) => {
  const education = await deleteEducation(req.params.id, req.user._id);

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Education deleted successfully"));
});

export { addEducation, getMyEducations, updateMyEducation, removeEducation };
