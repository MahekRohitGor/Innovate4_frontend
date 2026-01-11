import { useEffect } from "react";
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

  const { meetings = [], loading, error } = useSelector(
    (state) => state.meetings || {}
  );

  useEffect(() => {
    dispatch(getMeetings());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <HeaderwoLogo />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50">
          <p className="text-lg font-semibold text-indigo-600 animate-pulse">
            Loading meetings…
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
          </div>

          {/* EMPTY STATE */}
          {meetings.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-indigo-100 text-center">
              <p className="text-slate-600 text-lg">
                No meetings found yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {meetings.map((meeting) => (
                <div
                  key={meeting._id}
                  onClick={() => navigate(`/meeting/${meeting._id}`)}
                  className="group cursor-pointer bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
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
                      {formatTime(meeting.startedAt)} –{" "}
                      {formatTime(meeting.endedAt)}
                    </div>
                  </div>

                  {/* SUMMARY */}
                  <p className="text-slate-600 mt-4 leading-relaxed line-clamp-2">
                    {meeting.short_summary}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;