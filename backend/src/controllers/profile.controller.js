import {
  getProfileByUserId,
  updateProfileByUserId,
  updateUserSkills,
} from "../services/profile.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await getProfileByUserId(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
        profile,
      },
      "Profile fetched successfully",
    ),
  );
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const profile = await updateProfileByUserId(req.user._id, req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        profile,
      },
      "Profile updated successfully",
    ),
  );
});

const updateMySkills = asyncHandler(async (req, res) => {
  const user = await updateUserSkills(req.user._id, req.body.skills);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        skills: user.skills,
      },
      "Skills updated successfully",
    ),
  );
});

export { getMyProfile, updateMyProfile, updateMySkills };
