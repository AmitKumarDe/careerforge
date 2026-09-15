import api from "@/lib/axios";

export interface ExperienceItem {
  _id: string;
  user: string;
  company: string;
  jobTitle: string;
  employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  location?: string;
  startDate: string;
  endDate?: string | null;
  currentlyWorking?: boolean;
  description?: string;
  technologies?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperiencePayload {
  company: string;
  jobTitle: string;
  employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  location?: string;
  startDate: string;
  endDate?: string | null;
  currentlyWorking?: boolean;
  description?: string;
  technologies?: string[];
}

export const getMyExperiences = async (): Promise<ExperienceItem[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.get<any>("/users/experience");
  const data = response.data?.data;
  if (Array.isArray(data)) {
    return data;
  }
  return data?.experiences || [];
};

export const addExperience = async (payload: ExperiencePayload): Promise<ExperienceItem> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<any>("/users/experience", payload);
  const data = response.data?.data;
  return data?.experience || data;
};

export const updateExperience = async (id: string, payload: Partial<ExperiencePayload>): Promise<ExperienceItem> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.patch<any>(`/users/experience/${id}`, payload);
  const data = response.data?.data;
  return data?.experience || data;
};

export const deleteExperience = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/users/experience/${id}`);
  return response.data;
};
