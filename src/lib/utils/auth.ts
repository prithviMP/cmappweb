import { z } from 'zod';
import apiClient from '../apiClient';
import { deleteToken, saveToken, saveUserId, getToken } from './storage';
import useAuthStore from '../store/useAuthStore';

const loginResponseSchema = z.object({
  jwt: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    provider: z.string(),
    confirmed: z.boolean(),
    blocked: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

const userDetailsSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  provider: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user_group: z.object({
    designation: z.object({
      Name: z.string(),
    }).nullable(),
  }).nullable(),
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  socialSecurity: string;
  documents: string[];
  project: string;
  subContractorId: string;
}

export const login = async ({ email, password }: LoginCredentials) => {
  try {
    const response = await apiClient.post("/auth/local", {
      identifier: email,
      password,
    });

    const validatedResponse = loginResponseSchema.parse(response.data);
    const { jwt, user } = validatedResponse;

    // Convert numeric ID to string for storage
    const userId = user.id.toString();
    await saveToken(jwt);
    await saveUserId(userId);

    // Store user info in Zustand
    useAuthStore.getState().setUser({
      id: userId,
      username: user.username,
      email: user.email,
      provider: user.provider,
      confirmed: user.confirmed,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: jwt,
      designation: "", // Will be updated if needed in the future
    });

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async ({
  name,
  email,
  password,
  socialSecurity,
  documents,
  project,
  subContractorId,
}: SignupData) => {
  try {
    const payload = {
      data: {
        username: name,
        email,
        password,
        socialSecurityNumber: socialSecurity,
        project: { id: project },
        approver: null,
        documents: documents.map((docId) => ({ id: docId })),
        status: "pending",
        notification_status: "unread",
        sub_contractor: subContractorId,
      },
    };

    const response = await apiClient.post("/registrations", payload);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await deleteToken();
    useAuthStore.getState().clearUser();
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const debugToken = async (): Promise<void> => {
  try {
    const token = await getToken();
    if (token) {
      const parts = token.split(".");
      const payload = JSON.parse(atob(parts[1]));
      console.log("Token payload:", payload);
      console.log("Token expiration:", new Date(payload.exp * 1000));
      console.log("Current time:", new Date());
      console.log("Is token expired:", Date.now() > payload.exp * 1000);
    } else {
      console.log("No token found");
    }
  } catch (error) {
    console.error("Error parsing token:", error);
  }
};