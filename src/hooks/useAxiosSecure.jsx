import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://spark-academy-server.vercel.app/",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
