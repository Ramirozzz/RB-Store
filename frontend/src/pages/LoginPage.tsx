import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useLogin } from "../hooks/useLogin";
import useToastStore from "../stores/ToastStore";
import LoadingSpinner from "../components/LoadingSpinners/LoadingSpinner";
import { FiX } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  const login = useAuthStore((state) => state.login);
  const loginMutation = useLogin();

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          showToast("Successfully logged in.", "success");
          navigate("/");
        },
        onError: () => {
          showToast("Failed to login.", "error");
          setErrorMessage("Invalid email or password.");
        },
      },
    );
  };

  const demoLoginDetails = {
    email: "demo@rbstore.com",
    password: "Demo1212!",
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-20 mt-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl text-text">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-text"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-white px-4 py-3 text-[16px] outline-none placeholder:text-sm transition focus:border-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-text"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-white px-4 py-3 text-[16px] outline-none placeholder:text-sm transition focus:border-surface"
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600 font-normal">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full cursor-pointer bg-surface py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            {loginMutation.isPending ? (
              <LoadingSpinner size={18} color="#ffffff" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowDemo(!showDemo)}
            className="text-sm text-muted transition "
          >
            Just exploring?{" "}
            <span className="text-text underline">Use demo account</span>
          </button>

          {showDemo && (
            <div className="relative mt-4 border border-border p-4 text-left">
              <FiX
                onClick={() => setShowDemo(false)}
                className="absolute right-3 top-3 cursor-pointer"
              />
              <div className="mb-3">
                <h2 className="text-sm font-semibold text-text">
                  Demo Account
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Explore the store and admin dashboard with read-only access.
                </p>
              </div>

              <p className="text-sm">
                <span className="text-muted">Email:</span>{" "}
                {demoLoginDetails.email}
              </p>
              <p className="text-sm mt-1">
                <span className="text-muted">Password:</span>{" "}
                {demoLoginDetails.password}
              </p>

              <button
                type="button"
                onClick={() => {
                  setEmail(demoLoginDetails.email);
                  setPassword(demoLoginDetails.password);
                  setShowDemo(false);
                }}
                className="mt-5 w-full bg-surface py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800"
              >
                Fill Login Details
              </button>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-muted">
          Don't have an account?{"  "}
          <Link to="/register" className="text-text underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
