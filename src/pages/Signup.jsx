import Input from "../components/Input";
import Button from "../components/Button";
import leafImage from "../assets/final_logo.png";
import HeaderwoLogo from "../components/HeaderwoLogo";
import GoogleAuthModal from "../components/GoogleAuthModal";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/user/userThunks";

const Signup = () => {
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    dispatch(signup(payload));
  };

  

  return (
    <>
      <HeaderwoLogo />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="flex flex-col items-center justify-center px-4 py-9 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6">

              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  Get Started Now
                </h1>
                <p className="text-lg text-gray-600 max-w-sm mx-auto">
                  Create your account to unlock AI-powered meeting insights
                </p>
              </div>

              <form
                onSubmit={handleSignup}
                className="mt-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl ring-1 ring-black/5"
              >
                <Input name="name" label="Full Name" placeholder="Enter your full name" />
                <Input name="email" label="Email Address" placeholder="Enter your email" />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create a password"
                />
                <Input
                  name="institute"
                  label="Institute Name"
                  placeholder="Enter your institute name"
                />

                <Button type="submit" className="!w-full">
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-semibold text-blue-600 hover:text-indigo-700"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-blue-500/20 to-indigo-600/30">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${leafImage})` }}
            />
          </div>
        </div>
      </div>

      {isAuthenticated && user?.id && (
        <GoogleAuthModal userId={user.id} />
      )}
    </>
  );
};

export default Signup;