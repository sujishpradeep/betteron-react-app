const dev = {
  API_URL: "http://localhost:3005"
};

const prod = {
  API_URL: "http://localhost:3000"
};
const config = process.env.REACT_APP_NODE_ENV === "prod" ? prod : dev;
export default config;
