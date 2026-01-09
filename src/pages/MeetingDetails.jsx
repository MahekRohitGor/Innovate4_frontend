import { useParams, useNavigate } from "react-router-dom";

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Meeting #{id}</h2>

      <p className="mb-6 text-gray-600">
        Upload the meeting recording to process insights.
      </p>

      <input
        type="file"
        accept="audio/*,video/*"
        className="mb-4"
      />

      <button
        onClick={() => navigate(`/dashboard/${id}`)}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Process Recording
      </button>
    </div>
  );
};

export default MeetingDetails;