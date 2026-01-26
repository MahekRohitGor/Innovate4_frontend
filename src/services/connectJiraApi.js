import { secureFetch } from "../utils/secureFetch";

export const connectToJira = (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return secureFetch(
    `http://localhost:3000/api/user/jiraSignup?userId=${userId}`,
    {
    },
    "GET",
    token
  );
}