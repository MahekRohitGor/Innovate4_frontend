import { secureFetch } from "../utils/secureFetch";

export const downloadMom = (meetingId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return secureFetch(
    `http://localhost:3000/api/meeting/downloadMom/${meetingId}`,
    {},
    "GET",
    token
  );
};