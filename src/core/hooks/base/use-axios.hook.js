import axios from "axios";

const useAxios = (baseURL, headers) => {
  return axios.create({
    baseURL,
    headers,
  });
};

export { useAxios };
