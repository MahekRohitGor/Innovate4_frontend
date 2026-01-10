const JiraModal = ({ task, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      taskTitle: task.title,
      team: e.target.team.value,
      description: e.target.description.value,
    };

    console.log("JIRA FORM SUBMIT:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
        <h2 className="text-2xl font-black text-blue-900 mb-4">
          Raise Jira Ticket
        </h2>

        <p className="text-sm text-slate-600 mb-6">
          Task: <span className="font-semibold">{task.title}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Team</label>
            <select
              name="team"
              required
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Team</option>
              <option value="AI/ML Team">AI/ML Team</option>
              <option value="Frontend Team">Frontend Team</option>
              <option value="Backend Team">Backend Team</option>
              <option value="Management Team">Management Team</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description (optional)
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 text-white font-semibold shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JiraModal;