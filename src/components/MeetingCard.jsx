const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-400",
    text: "text-green-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-400",
    text: "text-red-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    text: "text-blue-700",
  },
};

const MeetingCard = ({
  title,
  start,
  end,
  members = [],
  extraCount = 0,
  color = "green",
  onClick,
}) => {
  const styles = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={`
        ${styles.bg} ${styles.border}
        border rounded-xl p-3 cursor-pointer
        hover:shadow-md transition-all
      `}
    >
      <h4 className="text-sm font-semibold leading-snug mb-1">
        {title}
      </h4>

      <p className="text-xs text-gray-500 mb-2">
        {start} – {end}
      </p>

      <div className="flex items-center">
        {members.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            alt="avatar"
            className="w-6 h-6 rounded-full border-2 border-white -ml-1 first:ml-0"
          />
        ))}

        {extraCount > 0 && (
          <span
            className={`
              ml-2 px-2 py-0.5 rounded-full text-xs font-medium
              ${styles.text} bg-white
            `}
          >
            +{extraCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;