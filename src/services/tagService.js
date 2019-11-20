import http from "./httpservice";
// import { apiUrl } from "../config.json";
import config from "../config";

const apiTags = config.API_URL + "/upstacks/tags/";

export function getTags() {
  return http.get(apiTags);
}
