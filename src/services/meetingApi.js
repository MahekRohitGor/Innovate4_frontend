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