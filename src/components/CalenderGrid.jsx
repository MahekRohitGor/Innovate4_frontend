import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = Array.from({ length: 9 }, (_, i) => i + 9);

const today = new Date();

const monthYear = today.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

const todayLabel = today.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});


const CalendarGrid = ({ meetings, onAdd, onSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-indigo-50 p-8 rounded-3xl shadow-2xl border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            {monthYear}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Weekly Schedule • Mon – Fri
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-slate-200 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-700">
            Today: {todayLabel}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6 px-6">
        <div className="flex items-center gap-2 text-emerald-600">
          <div className="w-4 h-4 bg-emerald-500 rounded-lg shadow-sm"></div>
          <span className="text-sm font-medium">Scheduled Meetings</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded-lg"></div>
          <span className="text-sm font-medium">Available Slots</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Empty corner */}
        <div className="border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white" />

        {/* Day Headers */}
        {days.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-bold border-b-2 border-slate-200 bg-gradient-to-r from-indigo-50 to-emerald-50 text-slate-800 shadow-sm hover:bg-indigo-100 transition-all duration-200"
          >
            <div className="text-lg uppercase tracking-wide">{day}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Full Day</div>
          </div>
        ))}

        {/* Hours & Meeting Cells */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour Label */}
            <div className="border-t-2 border-slate-200 p-4 text-sm font-mono bg-gradient-to-r from-slate-50 to-indigo-50 text-slate-700 font-semibold flex items-center shadow-sm">
              <span>{hour}:00</span>
              <div className="ml-auto w-2 h-2 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full shadow-sm"></div>
            </div>

            {/* Day Cells */}
            {days.map((day) => {
              const meeting = meetings.find(
                (m) => m.day === day && m.hour === hour
              );

              return (
                <div
                  key={day + hour}
                  className={`
                    border-t border-l border-slate-200 p-3 min-h-[80px] 
                    relative group hover:bg-gradient-to-br hover:from-indigo-50 hover:to-emerald-50 
                    transition-all duration-300 cursor-pointer overflow-hidden
                    ${meeting ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-400/20 border-emerald-200/50' : 'bg-white/50'}
                  `}
                  onClick={() => !meeting && onAdd({ day, hour })}
                >
                  {/* Hover overlay */}
                  {!meeting && (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  )}

                  {meeting ? (
                    <div
                      className="
                        relative bg-gradient-to-r from-emerald-500 to-emerald-600 
                        text-white p-4 rounded-xl shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-1 transition-all duration-300 
                        h-full flex flex-col justify-between group/meeting
                        border-2 border-white/30 backdrop-blur-sm
                      "
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(meeting);
                      }}
                    >
                      <div>
                        <p className="font-bold text-sm truncate leading-tight">
                          {meeting.title}
                        </p>
                        <p className="text-xs opacity-90 mt-1 font-mono">
                          {hour}:00 – {hour + 1}:00
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="
                      h-full flex flex-col items-center justify-center 
                      text-slate-400 group-hover:text-slate-600 transition-colors
                      space-y-2
                    ">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400/20 to-emerald-400/20 rounded-2xl border-2 border-dashed border-slate-300/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="text-xs font-medium text-center leading-tight">
                        Add Meeting
                      </div>
                    </div>
                  )}

                  {!meeting && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 via-emerald-400/20 to-indigo-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;