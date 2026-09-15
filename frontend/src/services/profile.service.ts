import api from "@/lib/axios";
import type { ProfileResponse, Profile } from "@/types/profile";

export const getMyProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>("/users/profile");

  return response.data;
};

export const updateMyProfile = async (
  profileData: Partial<Profile>,
): Promise<{
  success: boolean;
  data: {
    profile: Profile;
  };
  message: string;
}> => {
  const response = await api.patch("/users/profile", profileData);

  return response.data;
};

export const updateMySkills = async (
  skills: string[],
): Promise<{
  success: boolean;
  data: {
    user: any;
    skills: string[];
  };
  message: string;
}> => {
  const response = await api.patch("/users/profile/skills", { skills });

  return response.data;
};

