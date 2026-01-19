import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../features/calendar/calendarThunk";
import { useNavigate } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- 1. PAGINATION STATE ---
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Show 6 meetings per page

  // Redux Selectors
  // Note: Ensure your backend/slice returns a 'total' count for accurate pagination logic
  const { meetings = [], totalMeetings = 0, loading, error } = useSelector(
    (state) => state.meetings || {}
  );

  // --- 2. FETCH DATA ON PAGE CHANGE ---
  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Dispatch with pagination params
    dispatch(getMeetings({ page, limit }));
  }, [dispatch, page, limit]);

  // --- 3. PAGINATION HANDLERS ---
  const handleNext = () => {
    // If we have 'totalMeetings', check against that. 
    // Otherwise, just check if we received a full page of data.
    if (meetings.length === limit) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (loading && meetings.length === 0) {
    return (
      <>
        <HeaderwoLogo />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50">
          <p className="text-lg font-semibold text-indigo-600 animate-pulse">
            Loading meetings...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderwoLogo />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderwoLogo />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">
                Meetings
              </h1>
              <p className="text-slate-600 mt-2">
                All your AI-processed meetings in one place
              </p>
            </div>
            
            {/* Optional: Page Indicator Top Right */}
            <div className="hidden md:block bg-white/60 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-sm border border-indigo-50">
               Page {page}
            </div>
          </div>

          {/* LISTING AREA */}
          <div className="min-h-[400px]"> {/* Min-height prevents layout shift */}
            {loading ? (
               // Loading Skeleton Overlay (optional)
               <div className="flex items-center justify-center h-64 opacity-50">
                  <span className="text-indigo-500 font-medium">Refreshing...</span>
               </div>
            ) : meetings.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-indigo-100 text-center">
                <p className="text-slate-600 text-lg">No meetings found.</p>
                {page > 1 && (
                   <button onClick={() => setPage(1)} className="mt-4 text-indigo-600 font-bold hover:underline">
                      Go back to Page 1
                   </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {meetings.map((meeting) => (
                  <div
                    key={meeting._id}
                    onClick={() => navigate(`/meeting/${meeting._id}`)}
                    className="group cursor-pointer bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Decorative Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-white/0 to-indigo-500/0 group-hover:via-indigo-500/5 transition-all duration-500" />
                    
                    <div className="relative z-10">
                        {/* TOP ROW */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-700 transition">
                            {meeting.title}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                            {formatDate(meeting.startedAt)}
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 text-indigo-700 font-semibold text-sm">
                            {formatTime(meeting.startedAt)} – {formatTime(meeting.endedAt)}
                        </div>
                        </div>

                        {/* SUMMARY */}
                        <p className="text-slate-600 mt-4 leading-relaxed line-clamp-2">
                        {meeting.short_summary || "Processing summary..."}
                        </p>

                        {/* FOOTER */}
                        <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                            📝 MOM available
                        </span>
                        <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-600">
                            🎧 Audio saved
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                            📄 Transcript ready
                        </span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- 4. PAGINATION CONTROLS --- */}
          {meetings.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-6">
              
              <button
                onClick={handlePrev}
                disabled={page === 1 || loading}
                className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-bold shadow-lg border border-indigo-50 hover:bg-indigo-50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>

              <span className="font-bold text-slate-600 bg-white/50 px-4 py-2 rounded-xl border border-white">
                 Page {page}
              </span>

              <button
                onClick={handleNext}
                // Disable if we have fewer items than the limit (means we reached the end)
                disabled={meetings.length < limit || loading}
                className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Calendar;