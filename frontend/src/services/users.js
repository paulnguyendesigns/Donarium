import api from "./api";

export function updateProfile(data) {
  return api.patch("/auth/me", data);
}