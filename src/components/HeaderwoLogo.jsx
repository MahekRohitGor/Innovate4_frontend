import logo from "../assets/round_logo.png";
import { Link } from "react-router-dom";

const HeaderwoLogo = () => {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-md border-b border-green-100/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="group relative inline-flex items-center p-2 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
            <img
              src={logo}
              alt="App Logo"
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain group-hover:rotate-3 transition-transform duration-300 filter drop-shadow-sm"
              loading="lazy"
            />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-sky-400 bg-clip-text text-transparent drop-shadow-sm leading-tight">
              S.A.I.L
            </h1>
            <span className="text-xs sm:text-sm text-blue-600 font-medium tracking-wide opacity-90">
              AI-Powered Meetings
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 font-medium">
          <Link
            to="/home"
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderwoLogo;