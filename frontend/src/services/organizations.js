import api from "./api";

export function getOrganizations() {
  return api.get("/organizations/");
}