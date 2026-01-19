import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";
import JiraModal from "../components/JiraModal";
import { getMeetingMetrics } from "../features/metrics/metricsThunk";
import MeetingChatbot from "../components/MeetingChatbot";
import { getMeetingTasks } from "../features/tasks/taskThunk";
import { downloadMom } from "../services/momApi";
import { raiseJiraTicket } from "../services/jiraApi";


import {
  ArrowTrendingUpIcon,
  UsersIcon,
  MicrophoneIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon,
  DocumentTextIcon,
  SparklesIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";



/* ---------------- COLORS ---------------- */

const colorMap = {
  green: "from-emerald-500 via-teal-500 to-cyan-500",
  blue: "from-sky-500 via-indigo-500 to-purple-500",
  indigo: "from-violet-500 via-purple-500 to-fuchsia-500",
  orange: "from-orange-500 via-amber-500 to-yellow-500",
  purple: "from-purple-500 via-pink-500 to-rose-500",
  emerald: "from-emerald-500 via-green-500 to-teal-500",
  red: "from-rose-500 via-red-500 to-orange-500",
};

/* ---------------- METRIC CARD ---------------- */

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass-card-lg hover:-translate-y-2 transition-all duration-500 border p-3 rounded-xl">
    <div className="flex items-start justify-between">
      <div
        className={`p-4 rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white shadow-xl`}
      >
        <Icon className="w-7 h-7" />
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-500 font-semibold">{title}</p>
        <h3 className="text-xl font-black text-slate-900">
          {value ?? "—"}
        </h3>
      </div>
    </div>
  </div>
);

/* ---------------- SUMMARY ---------------- */

const SummaryCard = ({ title, children }) => (
  <div className="glass-card-xl hover:-translate-y-1 transition-all">
    <h2 className="text-lg font-black text-indigo-700 mb-4">{title}</h2>
    <p className="text-slate-700 leading-relaxed">{children}</p>
  </div>
);

/* ---------------- FEEDBACK ---------------- */

// const FeedbackCard = ({ children }) => (
//   <div className="glass-card-warning hover:-translate-y-1 transition-all">
//     <div className="flex items-center gap-3 mb-5">
//       <div className="p-3 rounded-xl bg-amber-500 text-white">
//         <ExclamationTriangleIcon className="w-6 h-6" />
//       </div>
//       <h2 className="text-xl font-black text-amber-800">
//         Suggested Improvements
//       </h2>
//     </div>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

const FeedbackItem = ({ children }) => (
  <div className="p-4 rounded-xl bg-white/70 border border-amber-200 text-slate-800">
    {children}
  </div>
);

/* ---------------- SIDEBAR ---------------- */

const SidebarPanel = () => {
  const { id: meetingId } = useParams();

  const { discussionItems, loading,nextActions } = useSelector(
    (state) => {
        console.log(state.tasks)
        return state.tasks
    }
  );

  const [submittingId, setSubmittingId] = useState(null);

  const handleRaiseJira = async () => {
    try {
      console.log("Raising Jira ticket for task:", meetingId);
      setSubmittingId(meetingId)
      await raiseJiraTicket(meetingId);
      alert("Jira ticket raised successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to raise Jira ticket");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
  <div className="sticky top-24 space-y-8">
    <div className="glass-card-xl p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      
      {/* GLOBAL LABEL */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          Productivity
        </p>
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
           {discussionItems.length + nextActions.length} Items
        </span>
      </div>

      {/* ================= SECTION 1: DISCUSSION ================= */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold text-slate-800">Discussion Topics</h3>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
             <div className="h-16 bg-slate-50 rounded-xl"></div>
             <div className="h-16 bg-slate-50 rounded-xl"></div>
          </div>
        ) : discussionItems.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No topics recorded.</p>
        ) : (
          <div className="space-y-3">
            {discussionItems.map((task) => (
              <div key={task._id} className="group p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h4 className="text-sm font-bold text-slate-800 mb-1">{task.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
                
                {/* JIRA ACTION */}
                {task.jira_recommended === "yes" && (
                  <button
                    onClick={() => handleRaiseJira(task._id)}
                    disabled={submittingId === task._id}
                    className="mt-3 w-full py-2 rounded-lg bg-white border border-indigo-100 text-indigo-600 text-xs font-bold shadow-sm hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submittingId === task._id ? (
                      <span className="animate-pulse">Creating...</span>
                    ) : (
                      <>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-jira-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944948.png" alt="Jira" className="w-3 h-3" />
                        Raise Ticket
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= VISUAL DIVIDER ================= */}
      <div className="my-8 border-t border-slate-100 relative">
         {/* Optional: Little anchor dot in center of divider */}
         <div className="absolute left-1/2 -top-1.5 -ml-1.5 w-3 h-3 bg-slate-100 rounded-full border-2 border-white"></div>
      </div>

      {/* ================= SECTION 2: NEXT ACTIONS ================= */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-800">Action Items</h3>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
             <div className="h-16 bg-slate-50 rounded-xl"></div>
          </div>
        ) : nextActions.length === 0 ? (
           <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
             <p className="text-sm text-slate-400">No actions detected.</p>
           </div>
        ) : (
          <div className="space-y-3">
            {nextActions.map((task) => (
              <div key={task._id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all">
                
                {/* Header with Fake Checkbox */}
                <div className="flex items-start gap-3">
                   <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-300 flex-shrink-0"></div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-snug">
                        {task.action_item}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                           {task.description}
                        </p>
                      )}
                   </div>
                </div>

                
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
};


/* ---------------- DASHBOARD ---------------- */

const Dashboard = () => {
  const { id: meetingId } = useParams();
  const dispatch = useDispatch();
  const [downloading, setDownloading] = useState(false);

  const { data: metrics, loading, error } = useSelector(
    (state) => state.metrics
  );

  const { shortSummary, longSummary } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(getMeetingMetrics(meetingId));
    dispatch(getMeetingTasks(meetingId));

  }, [dispatch, meetingId]);

  if (loading) {
    return (
      <>
        <HeaderwoLogo />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-semibold text-indigo-600">
            Loading dashboard…
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderwoLogo />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </>
    );
  }

  if (!metrics) return null;

  const metricConfig = [
    { title: "Engagement Score", value: metrics.engagement_score, icon: ArrowTrendingUpIcon, color: "green" },
    { title: "Speaker Balance", value: metrics.speaker_balance, icon: UsersIcon, color: "blue" },
    { title: "Silence Ratio", value: metrics.silence_ratio, icon: MicrophoneIcon, color: "indigo" },
    { title: "Conflict Level", value: metrics.conflict_level, icon: ExclamationTriangleIcon, color: "orange" },
    { title: "Time Utilization", value: metrics.time_utilization, icon: ClockIcon, color: "purple" },
    { title: "Meeting ROI", value: metrics.meeting_roi, icon: CurrencyDollarIcon, color: "emerald" },
    { title: "Resolution", value: metrics.meeting_resolution, icon: CheckCircleIcon, color: "green" },
    { title: "Off Topic Score", value: metrics.off_topic_score, icon: XMarkIcon, color: "red" },
  ];


  const handleDownloadMom = async () => {
    try {
      setDownloading(true);

      const res = await downloadMom(meetingId);
      const momFileUrl = res?.data?.data?.momFileUrl;

      if (!momFileUrl) {
        alert("MOM file not available yet");
        return;
      }

      // force download
      const link = document.createElement("a");
      link.href = momFileUrl;
      link.download = `meeting-${meetingId}-mom.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err);
      alert("Failed to download MOM");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <HeaderwoLogo />
  <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 font-sans text-slate-900">
    <div className="max-w-7xl mx-auto">
      
      {/* --- 1. HEADER SECTION (Action Oriented) --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              Analysis Ready
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Meeting Insights
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            AI-powered breakdown of your conversation.
          </p>
        </div>

        {/* Primary Action Moved Top Right */}
        <button
          onClick={handleDownloadMom}
          disabled={downloading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? (
             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
             <ArrowDownTrayIcon className="w-5 h-5" />
          )}
          <span>{downloading ? "Generating PDF..." : "Download Mom"}</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT MAIN CONTENT (9 Columns) --- */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* A. METRICS ROW (Clean Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {metricConfig.map((m, i) => (
              <MetricCard key={i} {...m} /> 
              // *Tip: Ensure MetricCard has bg-white, rounded-2xl, and shadow-sm
            ))}
          </div>

          {/* B. EXECUTIVE SUMMARY (The "Highlight" Box) */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-indigo-100">
                <SparklesIcon className="w-6 h-6" />
                <h3 className="font-bold text-lg tracking-wide uppercase">Executive Brief</h3>
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-95">
                {shortSummary || "Generating summary..."}
              </p>
            </div>
          </div>

          {/* C. DETAILED CONTENT (Document Style) */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <DocumentTextIcon className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl font-bold text-slate-800">Detailed Breakdown</h3>
            </div>
            
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-loose">
              {longSummary ? (
                 <div className="whitespace-pre-line">{longSummary}</div>
              ) : (
                 <p className="italic text-slate-400">Analysis pending...</p>
              )}
            </div>
          </div>

          {/* D. FEEDBACK SECTION (If available) */}
          {/* <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
             <h3 className="text-orange-800 font-bold mb-4">Areas for Improvement</h3>
             ... map your feedback items here ...
          </div> */}

        </div>

        {/* --- RIGHT SIDEBAR (3 Columns - Sticky) --- */}
        <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-8">
          <div className="space-y-6">
             {/* Sidebar Content */}
             <SidebarPanel />
             
             {/* Optional: Quick Help Card */}
             <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="text-blue-900 font-bold text-sm mb-2">Need help?</h4>
                <p className="text-blue-700 text-xs">If the metrics look off, try re-uploading the file or checking the transcript quality.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
      <MeetingChatbot meetingId={meetingId} />
    </>
  );
};

export default Dashboard;