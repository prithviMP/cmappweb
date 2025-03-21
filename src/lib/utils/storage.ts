import { z } from 'zod';

const tokenSchema = z.string().min(1);
const userIdSchema = z.string().min(1);

export async function saveToken(token: string): Promise<void> {
  try {
    const validToken = tokenSchema.parse(token);
    localStorage.setItem("userToken", validToken);
  } catch (error) {
    console.error("Error saving token:", error);
    throw new Error("Failed to save token");
  }
}

export async function getToken(): Promise<string | null> {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    return tokenSchema.parse(token);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

export async function saveUserId(id: string): Promise<void> {
  try {
    const validId = userIdSchema.parse(id);
    localStorage.setItem("userId", validId);
  } catch (error) {
    console.error("Error saving user ID:", error);
    throw new Error("Failed to save user ID");
  }
}

export async function getUserId(): Promise<string | null> {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) return null;
    return userIdSchema.parse(userId);
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
}

export async function deleteToken(): Promise<void> {
  try {
    localStorage.removeItem("userToken");
  } catch (error) {
    console.error("Error deleting token:", error);
    throw new Error("Failed to delete token");
  }
}