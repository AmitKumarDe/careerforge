import api from "@/lib/axios";

export interface EducationItem {
  _id: string;
  user: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: number;
  endYear?: number | null;
  currentlyStudying?: boolean;
  grade?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EducationPayload {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: number;
  endYear?: number | null;
  currentlyStudying?: boolean;
  grade?: string;
  description?: string;
}

export const getMyEducation = async (): Promise<EducationItem[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.get<any>("/users/education");
  const data = response.data?.data;
  if (Array.isArray(data)) {
    return data;
  }
  return data?.educations || [];
};

export const addEducation = async (payload: EducationPayload): Promise<EducationItem> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<any>("/users/education", payload);
  const data = response.data?.data;
  return data?.education || data;
};

export const updateEducation = async (id: string, payload: Partial<EducationPayload>): Promise<EducationItem> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.patch<any>(`/users/education/${id}`, payload);
  const data = response.data?.data;
  return data?.education || data;
};

export const deleteEducation = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/users/education/${id}`);
  return response.data;
};
