import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// ==> token author
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
//   return req;
// });

export const getCamp = () => API.get("/api/camp");
export const getCampById = (id) => API.get(`/api/camp/${id}`);
export const getAuction = () => API.get("/api/auction");
export const getAuctionById = (id) => API.get(`/api/auction/${id}`);
export const createTrans = (trans) => API.post(`/api/trans`, trans);
