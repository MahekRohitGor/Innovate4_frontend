import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../features/calendar/calendarThunk";
import { useNavigate } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getUserInfo } from "../features/user/userThunks";

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

  const { user,loading:userLoading } = useSelector((state) => state.user);
  
  // --- 2. FETCH DATA ON PAGE CHANGE ---
  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    
    dispatch(getMeetings({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(()=>{
    const token =localStorage.getItem("token");
    if(!user && token){
      dispatch(getUserInfo());
    }
  },[user])

  

  // --- 3. PAGINATION HANDLERS ---
  const handleNext = () => {
    
    if (meetings.length === limit) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const userId = user.id;
      
      const res = await fetch(
        `http://localhost:3000/api/user/googleSignup?userId=${userId}`
      );
      const data = await res.json();

      if (data.success) {
        window.location.href = data.data.auth_url;
      }
    } catch (err) {
      console.error("Google auth error", err);
    }
  };

  if (loading && userLoading) {
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

            {!(user?.isGoogleSynced) && (
              <button
              onClick={handleGoogleAuth}
                
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 font-bold hover:shadow-md hover:border-indigo-200 hover:text-indigo-600 transition-all group"
              >
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Sync Google Calendar</span>
                <ArrowPathIcon className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-700" />
              </button>
            )}
            
            {/* Optional: Page Indicator Top Right */}
            <div className="hidden md:block bg-white/60 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-sm border border-indigo-50">
               Page {page}
            </div>
          </div>

          {/* LISTING AREA */}
          <div className="min-h-[400px]"> {/* Min-height prevents layout shift */}
            {loading ? (
               
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