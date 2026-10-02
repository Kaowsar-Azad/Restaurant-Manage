"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-brand-white p-6 sm:p-10 rounded-2xl shadow-xl shadow-black/5">
      <div className="mb-6 sm:mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-brand-dark">
          Welcome Back
        </h1>
        <p className="text-brand-dark/60 text-sm">
          Enter your credentials to access the dashboard
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-brand-dark/80"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-0 py-2 bg-transparent border-b border-brand-dark/20 focus:border-brand-dark focus:outline-none transition-colors placeholder:text-brand-dark/30 text-brand-dark"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-brand-dark/80"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-brand-dark hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-0 py-2 bg-transparent border-b border-brand-dark/20 focus:border-brand-dark focus:outline-none transition-colors placeholder:text-brand-dark/30 text-brand-dark"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-8 bg-brand-accent text-brand-dark font-semibold rounded-lg hover:bg-[#e4fa9c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-dark/60">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-dark hover:underline transition-all"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}
