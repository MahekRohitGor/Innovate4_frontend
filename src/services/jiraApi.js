import { secureFetch } from "../utils/secureFetch";

export const raiseJiraTicket = (taskId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return secureFetch(
    "http://localhost:3000/api/meeting/createJiraTicket",
    {
      id: taskId,
    },
    "POST",
    token
  );
};