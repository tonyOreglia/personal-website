import * as axios from "axios";

export const fetchBreadcrumbs = () => {
  return axios.get("/allNotes");
};

export const saveBreadcrumb = (latitude, longitude, message, userName) => {
  return axios.post("/note", {
    message,
    longitude,
    latitude,
    altitude: 0,
    userName,
  });
};
