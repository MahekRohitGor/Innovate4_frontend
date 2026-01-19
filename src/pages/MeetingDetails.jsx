import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { getMeetingMetrics } from "../features/metrics/metricsThunk";
import { getMeetingById } from "../features/calendar/calendarThunk";

const MeetingDetails = () => {
  const { id: meetingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- 1. NEW STATE: Status Check Guard ---
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Existing States
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("idle");
  const [momStatus, setMomStatus] = useState("processing");
  const [momData, setMomData] = useState(null);
  const { currentMeeting } = useSelector((state) => state.meetings);
  const token = JSON.parse(localStorage.getItem("token"));

  // --- 2. NEW EFFECT: Auto-Redirect if meeting exists ---
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Dispatch the action and wait for the result
        const actionResult = await dispatch(getMeetingById(meetingId));

        
        
        // We check the payload directly (similar to how you did with getMetrics)
        if (getMeetingById.fulfilled.match(actionResult)) {
            const data = actionResult.payload;

            // CHECK: Redirect if audio already exists
            if (data && data.audioFilePath) {
                navigate(`/dashboard/${meetingId}`, { replace: true });
            } else {
                // If no file, stop loading and show Upload UI
                setIsCheckingStatus(false);
            }
        } else {
            // Handle error (e.g. meeting not found)
            console.error("Failed to fetch meeting");
            setIsCheckingStatus(false);
        }
      } catch (err) {
        setIsCheckingStatus(false);
      }
    };

    if (token) {
        checkStatus();
    }
  }, [dispatch, meetingId, navigate, token]);

  /* ---------------- HANDLERS ---------------- */

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Please upload an audio or video file");
      return;
    }

    try {
      setProcessingStage("uploading");
      setUploadProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("meetingId", meetingId);

      const res = await axios.post(
        "http://localhost:3000/api/meeting/processFile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            if (percentCompleted === 100) {
              setProcessingStage("transcribing");
            }
          },
        }
      );

      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process recording");
    } finally {
      setProcessingStage("idle");
      setUploadProgress(0);
    }
  };

  const handleDownloadTranscript = async () => {
    try {
      const response = await fetch(result.textFile.signedUrl);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meeting-transcript.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Unable to download transcript");
    }
  };

  const handleShowAnalytics = async () => {
    const res = await dispatch(getMeetingMetrics(meetingId));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/dashboard/${meetingId}`);
    }
  };

  // --- POLLING EFFECT (Only runs after a fresh upload) ---
  useEffect(() => {
    let intervalId;

    if (result && momStatus === "processing") {
      intervalId = setInterval(async () => {
        try {
          const idToCheck = result._id || result.id || meetingId;
          const res = await axios.get(
            `http://localhost:3000/api/meeting/${idToCheck}/status`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const status = res.data.data.momStatus;

          if (status === "completed") {
            setMomStatus("completed");
            setMomData(res.data.data);
            clearInterval(intervalId);
          } else if (status === "failed") {
            setMomStatus("failed");
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [result, momStatus, meetingId, token]);

  /* ---------------- UI RENDER ---------------- */



  // 1. LOADING SCREEN (Prevents flash of upload UI)
  if (isCheckingStatus) {
    return (
      <>
        <HeaderwoLogo />
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-blue-900 font-medium animate-pulse">
              Checking meeting status...
            </p>
          </div>
        </div>
      </>
    );
  }

  // 2. MAIN UPLOAD UI (Only shown if no existing file found)
  return (
    <>
      <HeaderwoLogo />

      <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-sky-100 py-12 relative overflow-hidden flex flex-col items-center justify-center">
        {/* --- BACKGROUND DECORATION --- */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-sky-400/20 rounded-full blur-3xl translate-y-1/3" />

        <div className="relative w-full max-w-4xl px-6 z-10 space-y-10">
          {/* HEADER */}
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-2">
              Meeting {currentMeeting?.title}
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 bg-clip-text text-transparent">
              Upload Your Recording
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get AI-powered summaries, engagement analytics, and insights in
              seconds.
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 p-8 md:p-12 transition-all duration-500">
            {/* --- UPLOAD ZONE --- */}
            {!result && (
              <div className="max-w-xl mx-auto space-y-8">
                <label
                  className={`group relative block cursor-pointer overflow-hidden ${
                    processingStage !== "idle" ? "pointer-events-none" : ""
                  }`}
                >
                  <div
                    className={`
                    h-64 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center px-6
                    ${
                      processingStage === "idle"
                        ? "border-blue-300 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-500"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }
                  `}
                  >
                    <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>

                    <p className="text-lg font-bold text-blue-900">
                      {file ? file.name : "Click to upload audio or video"}
                    </p>
                    {!file && (
                      <p className="text-sm text-gray-500 mt-2">
                        Supported formats: MP3, WAV, MP4
                      </p>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="audio/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={processingStage !== "idle"}
                  />
                </label>

                {/* Processing Button / Bar */}
                {processingStage === "idle" ? (
                  <button
                    onClick={handleProcess}
                    disabled={!file}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-lg font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Start Processing
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-blue-800">
                        {processingStage === "uploading"
                          ? "Uploading..."
                          : "Transcribing..."}
                      </span>
                      <span className="text-blue-600">
                        {processingStage === "uploading" ? (
                          `${uploadProgress}%`
                        ) : (
                          <span className="animate-pulse">Processing</span>
                        )}
                      </span>
                    </div>

                    <div className="h-3 w-full bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ease-out ${
                          processingStage === "transcribing"
                            ? "bg-indigo-500 animate-pulse w-full"
                            : "bg-blue-600"
                        }`}
                        style={{
                          width:
                            processingStage === "uploading"
                              ? `${uploadProgress}%`
                              : "100%",
                        }}
                      />
                    </div>
                    {processingStage === "transcribing" && (
                      <p className="text-xs text-center text-gray-400">
                        Do not close this window.
                      </p>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-center rounded-xl font-medium border border-red-100">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* --- SUCCESS RESULT --- */}
            {result && (
              <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Processing Complete!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Your files are ready for download.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Download Transcript */}
                  <button
                    onClick={handleDownloadTranscript}
                    className="flex flex-col items-center justify-center p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-100 transition-all group"
                  >
                    <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                    </span>
                    <span className="font-bold text-emerald-800">
                      Download Transcript
                    </span>
                  </button>

                  {/* Show Analytics */}
                  <button
                    onClick={handleShowAnalytics}
                    disabled={momStatus !== "completed"}
                    className={`
                    flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group
                    ${
                      momStatus === "completed"
                        ? "bg-indigo-50 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-100 cursor-pointer"
                        : "bg-gray-50 border-gray-100 opacity-70 cursor-not-allowed"
                    }
                  `}
                  >
                    <span
                      className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform ${
                        momStatus === "completed"
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}
                    >
                      {momStatus === "processing" ? (
                        <svg
                          className="animate-spin w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          ></path>
                        </svg>
                      )}
                    </span>
                    <span
                      className={`font-bold ${
                        momStatus === "completed"
                          ? "text-indigo-800"
                          : "text-gray-500"
                      }`}
                    >
                      {momStatus === "processing"
                        ? "Analyzing in background..."
                        : "View Analytics"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* INFO BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Audio Transcription", icon: "🎙️" },
              { label: "Silence Detection", icon: "🔇" },
              { label: "Topic Analysis", icon: "📊" },
              { label: "AI Summaries", icon: "✨" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/40 p-3 rounded-2xl backdrop-blur-sm border border-white/40 shadow-sm flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-slate-600">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDetails;