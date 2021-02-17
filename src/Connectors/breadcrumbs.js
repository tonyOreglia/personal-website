import * as axios from "axios";

export const fetchBreadcrumbs = (long, lat, radius) => {
  return axios.get("/allNotes");
};

export const saveBreadcrumb = (longitude, latitude, altitude, message) => {
  return axios.post("/note", {
    message,
    longitude,
    latitude,
    altitude,
  });
};
