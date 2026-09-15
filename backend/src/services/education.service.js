import Education from "../models/education.model.js";

const createEducation = async (userId, educationData) => {
  const education = await Education.create({
    user: userId,
    ...educationData,
  });

  return education;
};

const getUserEducations = async (userId) => {
  const educations = await Education.find({
    user: userId,
  }).sort({
    startYear: -1,
  });

  return educations;
};

const getEducationById = async (educationId, userId) => {
  const education = await Education.findOne({
    _id: educationId,
    user: userId,
  });

  return education;
};

const updateEducation = async (educationId, userId, educationData) => {
  const education = await Education.findOneAndUpdate(
    {
      _id: educationId,
      user: userId,
    },
    {
      $set: educationData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return education;
};

const deleteEducation = async (educationId, userId) => {
  const education = await Education.findOneAndDelete({
    _id: educationId,
    user: userId,
  });

  return education;
};

export {
  createEducation,
  getUserEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
