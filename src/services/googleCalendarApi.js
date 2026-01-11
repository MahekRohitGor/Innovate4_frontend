// src/services/googleCalendarApi.js
import { secureFetch } from "../utils/secureFetch";

export const fetchGoogleCalendars = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("Fetching Google Calendars with token: ", token); 
  return secureFetch("http://localhost:3000/api/meeting", {}, "GET", token);
};