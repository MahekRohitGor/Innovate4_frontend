import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarGrid from "../components/CalenderGrid";
import { createMeeting } from "../services/meetingApi";

const daysIndex = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };

const getWeekStart = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDateFromDay = (weekStart, day) => {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + daysIndex[day]);
  return d.toISOString().split("T")[0];
};

const Calendar = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ day: "", hour: 0, title: "" });

  const selectedWeekStart = getWeekStart(new Date());

  const handleAddMeeting = (slot) => {
    setNewMeeting({ ...slot, title: "" });
    setShowAddForm(true);
  };

  const handleSubmitMeeting = async (e) => {
    e.preventDefault();

    const meetingDate = getDateFromDay(
      selectedWeekStart,
      newMeeting.day
    );

    const payload = {
      id: Date.now(),
      ...newMeeting,
      date: meetingDate,
    };

    const res = await createMeeting(payload);

    if (res.success) {
      setMeetings((prev) => [...prev, res.data]);
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weekly Calendar</h1>

      <CalendarGrid
        meetings={meetings}
        onAdd={handleAddMeeting}
        onSelect={(m) => navigate(`/meeting/${m.id}`)}
      />

      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={handleSubmitMeeting}
            className="bg-white p-6 rounded-xl w-96 space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {newMeeting.day} | {newMeeting.hour}:00 – {newMeeting.hour + 1}:00
            </h2>

            <input
              required
              placeholder="Meeting title"
              className="w-full border px-4 py-2 rounded-lg"
              value={newMeeting.title}
              onChange={(e) =>
                setNewMeeting((p) => ({ ...p, title: e.target.value }))
              }
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;