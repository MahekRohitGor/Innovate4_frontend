export const fetchMeetingDashboard = async (meetingId) => {
  console.log("Fetching dashboard for meeting:", meetingId);

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
          meeting_roi: "Excellent",
        },
        summaries: {
          short_summary:
            "An expert from Johns Hopkins University provided a comprehensive overview of the causes, health impacts, and future outlook of air quality issues in the US due to Canadian wildfires.",
          long_summary:
            "The session, structured as an interview, featured Speaker A introducing the topic of widespread air quality alerts in the US caused by Canadian wildfires and interviewing Professor Peter DeCarlo...",
        },
        feedback: {
          improvements: [
            "Consider providing a brief recap of key takeaways at the conclusion.",
            "Minimize pauses between questions for smoother flow.",
          ],
        },
      });
    }, 800);
  });
};