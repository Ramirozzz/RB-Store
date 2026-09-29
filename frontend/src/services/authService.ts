import api from "./api";
import type { LoginData, LoginResponse, RegisterData } from "../types/auth";

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/users/login", data);

  return res.data;
};

export const registerUser = async (
  data: RegisterData,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/users", data);

  return res.data;
};
