import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
// import { loginUser } from "../services/authService";
import { useLogin } from "../hooks/useLogin";
import useToastStore from "../stores/ToastStore";
import LoadingSpinner from "../components/LoadingSpinners/LoadingSpinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const loginMutation = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
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
          setErrorMessage("Invalid email or password.");
        },
      },
    );
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setErrorMessage("");
  //     setIsLoading(true);

  //     try {
  //       const data = await loginUser({
  //         email,
  //         password,
  //       });

  //       login(data.token, data.user);

  //       showToast("Successfully logged in", "success");

  //       navigate("/");
  //     } catch {
  //       setErrorMessage("Invalid email or password.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-20">
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
            <p className="text-sm text-red-600">{errorMessage}</p>
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

        <p className="mt-6 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-text underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
