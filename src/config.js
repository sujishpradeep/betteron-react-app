const dev = {
  API_URL: "http://3.106.113.188:3005"
};

const prod = {
  API_URL: "llll"
};
const config = process.env.NODE_ENV === "prod" ? prod : dev;
export default config;
