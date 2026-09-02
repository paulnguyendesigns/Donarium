import api from "./api";

export function getRequests(filters = {}) {
  return api.get("/requests/", { params: filters });
}

export function fulfillRequest(requestId) {
  return api.post(`/requests/${requestId}/fulfill`);
}