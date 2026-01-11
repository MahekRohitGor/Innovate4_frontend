import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { discussionItems } from "../data/discussionItems";
import JiraModal from "../components/JiraModal";
import { getMeetingMetrics } from "../features/metrics/metricsThunk";
import MeetingChatbot from "../components/MeetingChatbot";
import { getMeetingTasks } from "../features/tasks/taskThunk";

import {
  ArrowTrendingUpIcon,
  UsersIcon,
  MicrophoneIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XMarkIcon,
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
  <div className="glass-card-lg hover:-translate-y-2 transition-all duration-500">
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

const FeedbackCard = ({ children }) => (
  <div className="glass-card-warning hover:-translate-y-1 transition-all">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-3 rounded-xl bg-amber-500 text-white">
        <ExclamationTriangleIcon className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-black text-amber-800">
        Suggested Improvements
      </h2>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const FeedbackItem = ({ children }) => (
  <div className="p-4 rounded-xl bg-white/70 border border-amber-200 text-slate-800">
    {children}
  </div>
);

/* ---------------- SIDEBAR ---------------- */

const SidebarPanel = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const jiraTasks = discussionItems.filter(
    (item) => item.jira_recommended === "yes"
  );

  return (
    <>
      <div className="sticky top-24 space-y-8">
        <div className="glass-card-xl">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Productivity
          </p>

          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Jira Recommended Tasks
          </h3>

          <div className="space-y-4">
            {jiraTasks.map((task, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {task.title}
                </h4>

                <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                  {task.description}
                </p>

                {task.jira_recommended === "yes" && (
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                    >
                      Raise Jira Ticket
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTask && (
        <JiraModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </>
  );
};

/* ---------------- DASHBOARD ---------------- */

const Dashboard = () => {
  const { id: meetingId } = useParams();
  const dispatch = useDispatch();

  const { data: metrics, loading, error } = useSelector(
    (state) => state.metrics
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

  return (
    <>
      <HeaderwoLogo />

      <div className="min-h-screen bg-hero-gradient p-6 md:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="col-span-12 lg:col-span-9 space-y-12">
            <div className="relative">
              <h1 className="text-3xl font-black text-indigo-700 mb-2">
                Meeting Dashboard
              </h1>
              <p className="text-slate-600">
                AI-powered meeting analytics & insights
              </p>
              <ChartBarIcon className="absolute top-0 right-0 w-20 h-20 text-indigo-300 opacity-40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricConfig.map((m, i) => (
                <MetricCard key={i} {...m} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SummaryCard title="Short Summary">
                {metrics.short_summary || "—"}
              </SummaryCard>

              <SummaryCard title="Detailed Summary">
                {metrics.long_summary || "—"}
              </SummaryCard>
            </div>

            <FeedbackCard>
              {(metrics.improvements || []).map((item, idx) => (
                <FeedbackItem key={idx}>{item}</FeedbackItem>
              ))}
            </FeedbackCard>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <SidebarPanel />
          </div>
        </div>
      </div>
      <MeetingChatbot meetingId={meetingId} />
    </>
  );
};

export default Dashboard;