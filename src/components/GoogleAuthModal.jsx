const GoogleAuthModal = ({ userId, onClose }) => {
  const handleGoogleAuth = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/googleSignup?userId=${userId}`
      );
      const data = await res.json();

      if (data.success) {
        window.location.href = data.data.auth_url;
      }
    } catch (err) {
      console.error("Google auth error", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl text-center">
        <h2 className="text-2xl font-black text-blue-900 mb-4">
          Authenticate with Google
        </h2>

        <p className="text-slate-600 mb-6">
          Please authenticate with Google to enable calendar access and meeting
          insights.
        </p>

        <button
          onClick={handleGoogleAuth}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-[1.03]"
        >
          Continue with Google
        </button>

        {/* <button
          onClick={onClose}
          className="mt-4 text-sm text-slate-500 hover:underline"
        >
          Do this later
        </button> */}
      </div>
    </div>
  );
};

export default GoogleAuthModal;