import api from "../api/axios";
import Cookies from "js-cookie";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
};

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(`/auth/login`, data);
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  localStorage.setItem("Authentication", accessToken);
  Cookies.set("Refresh", refreshToken, { expires: 7, httpOnly: true });

  return response.data;
};

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  console.log(api);
  const response = await api.post<AuthResponse>(`/auth/register`, data);
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  localStorage.setItem("Authentication", accessToken);
  Cookies.set("Refresh", refreshToken, { expires: 7, httpOnly: true });

  return response.data;
};

export const signOut = (): void => {
  console.log("signOut");
  localStorage.removeItem("Authentication");
  Cookies.remove("Refresh");
};

export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("Authentication");
  return !!accessToken;
};
