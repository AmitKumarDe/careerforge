import Experience from "../models/experience.model.js";

const createExperience = async (userId, experienceData) => {
  const experience = await Experience.create({
    user: userId,
    ...experienceData,
  });

  return experience;
};

const getUserExperiences = async (userId) => {
  const experiences = await Experience.find({
    user: userId,
  }).sort({
    startDate: -1,
  });

  return experiences;
};

const updateExperience = async (experienceId, userId, experienceData) => {
  const experience = await Experience.findOneAndUpdate(
    {
      _id: experienceId,
      user: userId,
    },
    {
      $set: experienceData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return experience;
};

const deleteExperience = async (experienceId, userId) => {
  const experience = await Experience.findOneAndDelete({
    _id: experienceId,
    user: userId,
  });

  return experience;
};

export {
  createExperience,
  getUserExperiences,
  updateExperience,
  deleteExperience,
};
