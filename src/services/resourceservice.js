import http from "./httpservice";
import config from "../config";

const apiResources = config.API_URL + "/upstacks/resources";

export function getAllResources() {
  return http.get(apiResources);
}

export function getResourcesByTag(tag) {
  return http.get(`${apiResources}/findbytag/${tag}`);
}

export function deleteResources(id) {
  return http.delete(`${apiResources}/${id}`);
}

export function addResources(resource) {
  return http.post(apiResources, resource);
}
