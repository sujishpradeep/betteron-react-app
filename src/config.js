const dev = {
  API_URL: "https://myunspent.com"
};

const prod = {
  API_URL: "llll"
};
const config = process.env.NODE_ENV === "prod" ? prod : dev;
export default config;
