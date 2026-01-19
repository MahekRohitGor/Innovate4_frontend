import Input from "../components/Input";
import Button from "../components/Button";
import leafImage from "../assets/final_logo.png";
import { useNavigate } from "react-router-dom";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userThunks";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isLogin } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    dispatch(login(payload));
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/calendar");
    }
  }, [isLogin, navigate]);

  return (
    <>
      <HeaderwoLogo />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex">
        
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
          
          {/* Background Blobs */}
          <div className="absolute top-20 left-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />

          <div className="w-full max-w-[500px] space-y-10 bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/60">
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent tracking-tight">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-500 font-medium">
                Sign in to access your workspace
              </p>
            </div>

            {/* Form */}
            <form className="space-y-7" onSubmit={handleLogin}>
              <div className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                  <Input
                    name="email"
                    label="Email Address"
                    placeholder="name@company.com"
                    // UX FIX: Taller input (py-4), larger text (text-lg), and solid background for contrast
                    className="w-full px-6 py-4 text-lg bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-400 font-medium text-gray-800"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••••••"
                    // UX FIX: Matching bulky style
                    className="w-full px-6 py-4 text-lg bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-400 font-medium text-gray-800"
                  />
                  <div className="flex justify-end pt-1">
                    <a
                      href="/forgot-password"
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              {/* Error Alert Box */}
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 font-medium animate-in fade-in slide-in-from-top-2">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                // UX FIX: Made button height match inputs (py-4) and added bold text
                className="!w-full py-4 text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                load={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Footer Link */}
              <p className="text-center text-gray-500 font-medium">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-bold text-blue-600 hover:text-indigo-600 hover:underline transition-all ml-1"
                >
                  Create Account
                </a>
              </p>
            </form>
          </div>
        </div>

        
        <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${leafImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />

          <div className="relative z-10 w-full h-full flex flex-col justify-end p-20 text-white space-y-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>

            <div>
              <h2 className="text-5xl font-bold leading-tight mb-4">
                "Predict the future by creating it."
              </h2>
              <p className="text-emerald-100 text-xl max-w-lg leading-relaxed opacity-90">
                Join thousands of users organizing their meetings and analytics
                efficiently.
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-3 pt-4">
              <div className="w-10 h-2.5 rounded-full bg-white shadow-lg"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;