import Profile from "../models/profile.model.js";

const getProfileByUserId = async (userId) => {
  let profile = await Profile.findOne({ user: userId });

  //profile not found then automatically create
  if (!profile) {
    profile = await Profile.create({ user: userId });
  }

  return profile;
};

const updateProfileByUserId = async (userId, profileData) => {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $set: profileData,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  );

  return profile;
};

const updateUserSkills = async (userId, skills) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        skills,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshToken");

  return user;
};

export { getProfileByUserId, updateProfileByUserId, updateUserSkills };
