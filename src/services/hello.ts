import axios from "axios";

export const getHello = () => {
  return axios({
    url: "/api/hello",
    method: "GET",
  });
};
