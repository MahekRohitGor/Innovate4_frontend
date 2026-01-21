import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/hori_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";


const HeaderwoLogo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLogin} = useSelector((state) => state.user);

const handleLogout=()=>{
  dispatch(logout());
  navigate("/login");
}
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-2 bg-white/80 backdrop-blur-md border-b border-green-100/50 shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18">
    
    <div className="flex items-center">
      <Link
        to="/"
        className="relative inline-flex items-center h-full"
      >
        <img
          src={logo}
          alt="App Logo"
          className="
            h-full 
            max-h-14 sm:max-h-16
            w-auto
            object-contain
            transition-transform duration-300
          "
          loading="lazy"
        />
      </Link>
    </div>

    <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 font-medium">
      <Link
        to="/home"
        className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
      >
        Home
      </Link>

      {
      isLogin && (
        <div className=" hidden md:flex items-center gap-2 text-sm text-gray-600 font-medium">
      <button
        onClick={() => handleLogout()}
        className="cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
      >
        Logout
      </button>
    </div>
      )
    }
    </div>

    

  </div>
</header>

  );
};

export default HeaderwoLogo;