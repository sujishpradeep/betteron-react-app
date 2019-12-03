import http from "./httpservice";
import config from "../config";

const apiAccounts = config.API_URL + "/upstacks/accounts/";

export function getAccounts() {
  return http.get(apiAccounts);
}

export function getAccount(id) {
  return http.get(apiAccounts + id);
}

export function updateAccountUpvotes(id, upvotes) {
  return http.put(apiAccounts + "upvotes/" + id, upvotes);
}
