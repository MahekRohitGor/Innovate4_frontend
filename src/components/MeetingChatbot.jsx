import { useState } from "react";
import axios from "axios";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

const MeetingChatbot = ({ meetingId }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.post(
        "http://localhost:3000/api/meeting/chatResponse",
        { meetingId, question: userMessage.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const answer =
        res.data?.data?.answer || "Sorry, I couldn’t find an answer.";

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-2xl hover:scale-105 transition"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-indigo-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-sky-500 text-white">
            <h3 className="font-bold">Meeting Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
            {messages.length === 0 && (
              <p className="text-sm text-slate-500 text-center mt-10">
                Ask anything about this meeting…
              </p>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-white border text-slate-700"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <p className="text-xs text-slate-400">Thinking…</p>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question…"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingChatbot;