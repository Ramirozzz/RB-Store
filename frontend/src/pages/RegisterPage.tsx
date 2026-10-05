import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import useToastStore from "../stores/ToastStore";
import LoadingSpinner from "../components/LoadingSpinners/LoadingSpinner";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const RegisterPage = () => {
  const registerMutation = useRegister();
  const login = useAuthStore((state) => state.login);
  const showToast = useToastStore((state) => state.showToast);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
          showToast("Account created successfully.", "success");
          navigate("/");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrorMessage(
              error.response?.data || "Could not create account.",
            );
          } else {
            setErrorMessage("Could not create account.");
          }
        },
      },
    );
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-40">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Join Us
          </p>
          <h1 className="mt-2 text-3xl text-text">Create account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full border border-border bg-white px-4 py-3 text-[16px] text-text outline-none placeholder:text-sm transition focus:border-surface"
              placeholder="Enter your name"
            />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-border bg-white px-4 py-3 text-[16px] text-text outline-none placeholder:text-sm transition focus:border-surface"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full border border-border bg-white px-4 py-3 text-[16px] text-text outline-none placeholder:text-sm transition focus:border-surface"
              placeholder="Enter your password"
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600"> {errorMessage} </p>
            )}
          </div>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="flex w-full cursor-pointer items-center justify-center bg-surface py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {registerMutation.isPending ? (
              <LoadingSpinner size={18} />
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-text underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
