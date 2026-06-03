import axios from "axios";

const dripzoidApi = axios.create({
  baseURL:
    "https://api.dripzoid.com",

  withCredentials: true,
});

export default dripzoidApi;