import { secureFetch } from "../utils/secureFetch";

const fakeDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const createMeeting = async (meetingPayload) => {
  console.log("📤 Sending meeting to backend:", meetingPayload);

  await fakeDelay();
  const response = {
    success: true,
    data: {
      ...meetingPayload,
      serverId: Math.floor(Math.random() * 100000),
      createdAt: new Date().toISOString(),
    },
  };

  console.log("📥 Backend response:", response);

  return response;

  // 🔁 REAL BACKEND (later)
  // return axios.post("/api/meetings", meetingPayload);
};

export const fetchMeetingDashboard = async (meetingId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metrics: {
          engagement_score: 9,
          speaker_balance: "Skewed",
          silence_ratio: "Medium",
          off_topic_score: 0,
          conflict_level: "None",
          time_utilization: "Excellent",
          meeting_resolution: "Success",
          meeting_roi: "Excellent"
        },
        summaries: {
          short_summary: "cvgbhnj",
          long_summary: "dfghj",
        },
        feedback: {
          improvements: [
            "Encourage quieter members to share their thoughts.",
            "Set clearer agendas to reduce off-topic discussions.",
            "Incorporate more interactive elements to boost engagement.",
          ]
        }
      });
    }, 500);
  });
};

export const fetchMeetingById = async (meetingId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return secureFetch(
    `http://localhost:3000/api/meeting/${meetingId}`, 
    {}, 
    "GET", 
    token
  );
};



export const fetchMeetings = async ({page,limit}) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return secureFetch(
    `http://localhost:3000/api/meeting?page=${page}&limit=${limit}`,
    {},
    "GET",
    token
  );
};
