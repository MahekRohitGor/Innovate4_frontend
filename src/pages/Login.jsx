import Input from "../components/Input";
import Button from "../components/Button";
import leafImage from "../assets/leaf.jpg";
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    {/* Left Form */}
                    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-0">
                        <div className="w-full max-w-md space-y-8">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                    Welcome Back
                                </h1>
                                <p className="text-lg text-gray-600 max-w-sm mx-auto">
                                    Sign in to continue your journey with us
                                </p>
                            </div>
                            <form className="mt-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl ring-1 ring-black/5" onSubmit={handleLogin}>
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
                                        placeholder="Enter your password"
                                        className="relative"
                                    />
                                </div>
                                <div className="text-right">
                                    <a href="/forgot-password" className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors duration-200">
                                        Forgot password?
                                    </a>
                                </div>
                                <Button type="submit" className="!w-full" load={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        New here?{' '}
                                        <a href="/signup" className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200">
                                            Create Account
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Right Image */}
                    <div className="hidden lg:flex items-stretch bg-gradient-to-b from-green-500/20 to-emerald-600/30">
                        <div
                            className="w-full flex-1 bg-cover bg-center bg-no-repeat relative overflow-hidden"
                            style={{ backgroundImage: `url(${leafImage})` }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;