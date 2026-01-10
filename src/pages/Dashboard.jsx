import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDashboardData } from "../features/dashboard/dashboardThunk";
import HeaderwoLogo from "../components/HeaderwoLogo";
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

const colorMap = {
  green: "from-emerald-500 via-teal-500 to-cyan-500",
  blue: "from-sky-500 via-indigo-500 to-purple-500",
  indigo: "from-violet-500 via-purple-500 to-fuchsia-500",
  orange: "from-orange-500 via-amber-500 to-yellow-500",
  purple: "from-purple-500 via-pink-500 to-rose-500",
  emerald: "from-emerald-500 via-green-500 to-teal-500",
  red: "from-rose-500 via-red-500 to-orange-500",
};

const SidebarPanel = () => (
  <div className="sticky top-24 space-y-8">
    <div className="glass-card-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
        Productivity
      </p>
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        Assigned Tasks
      </h3>

      <div className="p-4 rounded-xl bg-slate-50 text-sm text-slate-600 text-center">
        No tasks assigned yet
      </div>

      <button
        disabled
        className="mt-6 w-full py-2 rounded-xl bg-slate-200 text-slate-500 font-semibold cursor-not-allowed"
      >
        Raise Jira Ticket
      </button>
    </div>

    <div className="glass-card-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
        Schedule
      </p>
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        Google Calendar
      </h3>

      <div className="h-40 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-medium">
        Calendar coming soon
      </div>
    </div>
  </div>
);

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div
    aria-label={`Metric ${title}: ${value}`}
    className="glass-card-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div
        className={`p-4 rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white shadow-xl`}
      >
        <Icon className="w-8 h-8" />
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-500 font-semibold">{title}</p>
        <h3 className="text-xl font-black text-slate-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
      </div>
    </div>
  </div>
);

const SummaryCard = ({ title, children }) => (
  <div className="glass-card-xl hover:-translate-y-1 transition-all duration-300">
    <h2 className="text-xl font-black text-emerald-700 mb-4">{title}</h2>
    <p className="text-slate-700 leading-relaxed">{children}</p>
  </div>
);

const FeedbackCard = ({ children }) => (
  <div className="glass-card-warning hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center space-x-4 mb-6">
      <div className="p-3 rounded-xl bg-amber-500 text-white">
        <ExclamationTriangleIcon className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-black text-amber-800">
        Suggested Improvements
      </h2>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const FeedbackItem = ({ children }) => (
  <div className="p-4 rounded-xl bg-white/70 border border-amber-200 text-slate-800">
    {children}
  </div>
);

const Dashboard = () => {
  const { meetingId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData(meetingId));
  }, [dispatch, meetingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-emerald-600">
          Loading dashboard…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { metrics, summaries, feedback } = data;

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

          {/* LEFT : 3/4 */}
          <div className="col-span-12 lg:col-span-9 space-y-12">
            <div className="relative">
              <h1 className="text-3xl font-black text-emerald-700 mb-3">
                Meeting Dashboard
              </h1>
              <p className="text-slate-600 font-medium">
                AI-powered meeting analytics & insights
              </p>
              <ChartBarIcon className="absolute top-0 right-0 w-20 h-20 text-emerald-300 opacity-40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricConfig.map((m, i) => (
                <MetricCard key={i} {...m} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SummaryCard title="Short Summary">
                {summaries.short_summary}
              </SummaryCard>
              <SummaryCard title="Detailed Summary">
                {summaries.long_summary}
              </SummaryCard>
            </div>

            <FeedbackCard>
              {feedback.improvements.map((item, idx) => (
                <FeedbackItem key={idx}>{item}</FeedbackItem>
              ))}
            </FeedbackCard>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <SidebarPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;