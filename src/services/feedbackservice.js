import http from "./httpservice";
import config from "../config";

const apiFeedback = config.API_URL + "/upstacks/feedbacks/";

export function getAllFeedback() {
  return http.get(apiFeedback);
}

export function deleteFeedback(id) {
  return http.delete(`${apiFeedback}/${id}`);
}

export function addFeedback(feedback) {
  //   console.log("feedback", feedback);
  return http.post(apiFeedback, feedback);
}
