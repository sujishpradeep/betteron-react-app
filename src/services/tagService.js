import http from "./httpservice";
// import { apiUrl } from "../config.json";
import config from "../config";

const apiTags = config.API_URL + "/upstacks/tags/";

export function getTags() {
  return http.get(apiTags);
}

export function deleteTags(id) {
  return http.delete(`${apiTags}/${id}`);
}

export function addTags(tag) {
  return http.post(apiTags, tag);
}
