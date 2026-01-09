
export const signupUser = async (data) => {
  console.log("Signup Payload:", data);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
};

export const loginUser = async (data) => {
  console.log("Login Payload:", data);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true, token: "dummy-token" }), 1000)
  );
};