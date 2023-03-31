import axios from "axios";
export const cacheApi = axios.create({
  baseURL: "https://api.leanow.vn/cache/product/",
});

export const webApi = axios.create({
  baseURL: "https://leanservices.work/",
});
export const attributesApi = axios.create({
  baseURL: "https://api.leanow.vn/attributes/search/",
});

export const cmsApi = axios.create({
  baseURL: "https://sss-dashboard.leanservices.work/w/"
})