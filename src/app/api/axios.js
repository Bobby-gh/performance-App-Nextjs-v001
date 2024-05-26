import axios from "axios";

export default axios.create({
  baseURL: "https://performance-app.up.railway.app/api/v1/department-goals",
});
