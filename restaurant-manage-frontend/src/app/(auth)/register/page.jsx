"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
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
          Join Us
        </h1>
        <p className="text-brand-dark/60 text-sm">
          Create an account to manage your restaurant
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wider text-brand-dark/80"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-0 py-2 bg-transparent border-b border-brand-dark/20 focus:border-brand-dark focus:outline-none transition-colors placeholder:text-brand-dark/30 text-brand-dark"
          />
        </div>

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
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-brand-dark/80"
          >
            Password
          </label>
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

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="text-xs font-semibold uppercase tracking-wider text-brand-dark/80"
          >
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-brand-dark/20 focus:border-brand-dark focus:outline-none transition-colors text-brand-dark appearance-none cursor-pointer"
          >
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-8 bg-brand-accent text-brand-dark font-semibold rounded-lg hover:bg-[#e4fa9c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-dark/60">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-dark hover:underline transition-all"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
