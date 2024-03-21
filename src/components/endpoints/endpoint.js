import axios from "axios";

export const baseUrl = "http://localhost:3000";

export const update = "/update_user";

export const login = "/login";

export const signup = "/signup";

export const logout = "logout";

export const add = "/add_user";

export const get = "/get_user";

export const del = "/delete_user";

export const makeRequest = async (url, data) => {
  try {
    const req = await axios.post(baseUrl + url, data);
    return req;
  } catch (err) {
    console.log("something went wrong", err);
  }
};
