import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";
import axios from "axios";

const MeetingDetails = () => {
  const { id: meetingId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleDownloadTranscript = async () => {
    try {
      const response = await fetch(result.textFile.signedUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch transcript");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "meeting-transcript.txt"; // filename
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Unable to download transcript");
    }
  };



  const handleProcess = async () => {
    if (!file) {
      setError("Please upload an audio or video file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("meetingId", meetingId);

      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.post(
        "http://localhost:3000/api/meeting/processFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to process recording"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderwoLogo />

      <div className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-sky-100 px-6 md:px-12 lg:px-20 py-12 relative overflow-hidden flex">

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-gradient-to-br from-sky-400/20 to-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 bg-clip-text text-transparent mb-4">
                Meeting #{meetingId}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                Upload your meeting recording to generate AI-powered summaries,
                insights, action items, and performance analytics.
              </p>
            </div>

            {!result && (
              <label className="group relative block cursor-pointer">
                <div className="h-56 rounded-3xl border-2 border-dashed border-blue-200 bg-white/70 backdrop-blur-xl hover:bg-blue-50/70 hover:border-blue-400 transition-all duration-300 shadow-xl flex flex-col items-center justify-center text-center px-6">
                  <svg
                    className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>

                  <p className="text-base font-semibold text-blue-700">
                    Click to upload audio or video file
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    MP3, WAV, MP4 • Max 2GB
                  </p>

                  {file && (
                    <p className="mt-3 text-sm text-slate-700 font-medium">
                      Selected: {file.name}
                    </p>
                  )}
                </div>

                <input
                  type="file"
                  accept="audio/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}

            {error && (
              <p className="text-red-500 font-medium">{error}</p>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100/50 p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                What happens next?
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li>• Audio transcription & speaker detection</li>
                <li>• Engagement & silence analysis</li>
                <li>• Topic drift & conflict detection</li>
                <li>• AI-generated summaries & feedback</li>
              </ul>
            </div>

            {!result ? (
              <button
                onClick={handleProcess}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white font-bold tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Process Recording"}
              </button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadTranscript}
                  className="py-4 rounded-2xl bg-emerald-600 text-white font-bold shadow hover:shadow-xl transition"
                >
                  Download Transcript
                </button>

                <button
                  onClick={() => navigate(`/dashboard/${meetingId}`)}
                  className="py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow hover:shadow-xl transition"
                >
                  Show Analytics
                </button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              Processing may take a few minutes depending on file size
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDetails;