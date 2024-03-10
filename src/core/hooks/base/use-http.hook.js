import { useAxios } from "./use-axios.hook";

export function useHttp(baseURL, headers) {
  const axios = useAxios(baseURL, headers);

  async function delet(url) {
    const response = await axios.delete(url);
    return response;
  }

  async function get(url) {
    const response = await axios.get(url);
    return response;
  }

  async function post(url, data, headers) {
    const response = await axios.post(url, data, headers);
    return response;
  }

  async function put(url, data) {
    const response = await axios.put(url, data);
    return response;
  }

  return {
    delet,
    get,
    post,
    put,
  };
}
