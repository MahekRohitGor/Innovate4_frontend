import Input from "../components/Input";
import Button from "../components/Button";
import leafImage from "../assets/leaf.jpg";
import HeaderwoLogo from "../components/HeaderwoLogo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/user/userThunks";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    dispatch(signup(payload));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <HeaderwoLogo />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          {/* Left Form */}
          <div className="flex flex-col items-center justify-center px-4 py-9 sm:px-6 lg:px-8 lg:py-0">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Get Started Now
                </h1>
                <p className="text-lg text-gray-600 max-w-sm mx-auto">
                  Create your account to discover a world of fresh opportunities
                </p>
              </div>
              <form className="mt-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl ring-1 ring-black/5" onSubmit={handleSignup}>
                <div>
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    className="relative"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    className="relative"
                  />
                </div>
                <div>
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    className="relative"
                  />
                </div>
                {/* <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded accent-green-500 mt-1 cursor-pointer transition-all duration-200 hover:scale-105"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="terms" className="block text-sm font-medium leading-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                      I agree to the <span className="text-green-600 hover:underline font-semibold">Terms & Policy</span>
                    </label>
                  </div>
                </div> */}
                <Button type="submit" className="!w-full">
                  {loading ? "Signing in..." : "Signin"}
                </Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200">
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-green-500/20 to-emerald-600/30 backdrop-blur-sm">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
              style={{ backgroundImage: `url(${leafImage})` }}
            >
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;