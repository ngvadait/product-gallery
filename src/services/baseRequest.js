import axios from "axios";

const baseRequest = axios.create({
  baseURL: "https://dummyjson.com",
});

export default baseRequest;
