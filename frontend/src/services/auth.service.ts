import api from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "RECRUITER";
  skills?: string[];
}

export interface UserResponseData {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "RECRUITER" | "ADMIN";
  skills: string[];
  isEmailVerified: boolean;
  avatar?: string;
  createdAt?: string;
}

export interface AuthResponse {
  statusCode: number;
  data: {
    user: UserResponseData;
    accessToken?: string;
  };
  message: string;
  success: boolean;
}

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  if (typeof window !== "undefined") {
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    const user = response.data?.data?.user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
  return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};

export const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
  const response = await api.post("/auth/logout");
  return response.data;
};

export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post(`/auth/reset-password/${token}`, { newPassword });
  return response.data;
};

export const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post(`/auth/verify-email/${token}`);
  return response.data;
};

export const resendVerification = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.post("/auth/resend-verification", { email });
  return response.data;
};
