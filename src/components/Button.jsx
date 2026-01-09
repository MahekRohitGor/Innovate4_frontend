const Button = ({ children, onClick, type = "button", load}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={load}
    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
  >
    {children}
  </button>
);

export default Button;