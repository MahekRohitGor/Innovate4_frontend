import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { getMeetingById } from "../features/calendar/calendarThunk";

const MeetingDetails = () => {
  const { id: meetingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Status Check Guard ---
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Upload States
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("idle");
  const { currentMeeting } = useSelector((state) => state.meetings);
  const token = JSON.parse(localStorage.getItem("token"));

  // --- Auto-Redirect if meeting already has audio ---
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const actionResult = await dispatch(getMeetingById(meetingId));

        if (getMeetingById.fulfilled.match(actionResult)) {
            const data = actionResult.payload;

            // Redirect if audio already exists (processing or done)
            if (data && data.audioFilePath) {
                navigate(`/dashboard/${meetingId}`, { replace: true });
            } else {
                setIsCheckingStatus(false);
            }
        } else {
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
          },
        }
      );

      // Backend returns immediately after upload + enqueue
      // Navigate to dashboard — it will poll MomStatus
      if (res.data.success) {
        navigate(`/dashboard/${meetingId}`);
      } else {
        setError(res.data.message || "Upload failed");
        setProcessingStage("idle");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload recording");
      setProcessingStage("idle");
      setUploadProgress(0);
    }
  };

  /* ---------------- UI RENDER ---------------- */

  // LOADING SCREEN
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

  // MAIN UPLOAD UI
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

              {/* Upload Button / Progress Bar */}
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
                    <span className="text-blue-800">Uploading...</span>
                    <span className="text-blue-600">{uploadProgress}%</span>
                  </div>

                  <div className="h-3 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out bg-blue-600"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  {uploadProgress === 100 && (
                    <p className="text-xs text-center text-gray-400 animate-pulse">
                      Submitting for processing...
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