const dev = {
  API_URL: "http://localhost:3000"
};

const prod = {
  API_URL: "http://localhost:3000"
};
const config = process.env.REACT_APP_NODE_ENV === "prod" ? prod : dev;
export default config;

//https://www.myunspent.com"
//http://localhost:3000"
