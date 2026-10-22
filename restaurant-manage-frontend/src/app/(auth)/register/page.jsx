"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      router.replace("/");
    }
  }, [router]);

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
        body: JSON.stringify({
          name,
          email,
          password,
          restaurantName,
          role: "OWNER", // রেস্টুরেন্ট ওনার স্বয়ংক্রিয়ভাবে OWNER
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "রেজিস্ট্রেশন সফল হয়নি");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/5 border border-black/5">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-dark mb-1">
          রেস্টুরেন্ট অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-brand-dark/60 text-xs sm:text-sm">
          মালিক হিসেবে সাইন-আপ করে আপনার রেস্টুরেন্ট পরিচালনা শুরু করুন
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label
            htmlFor="restaurantName"
            className="block text-xs font-bold text-brand-dark mb-1"
          >
            রেস্টুরেন্টের নাম *
          </label>
          <input
            id="restaurantName"
            type="text"
            required
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="উদা: সুলতান'স ডাইন"
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold text-brand-dark mb-1"
          >
            আপনার পূর্ণ নাম (মালিকের নাম) *
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="উদা: কাওসার আহমেদ"
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-brand-dark mb-1"
          >
            ইমেইল এড্রেস *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@restaurant.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-brand-dark mb-1"
          >
            পাসওয়ার্ড *
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-primary text-white font-bold rounded-xl hover:bg-brand-hover shadow-md shadow-primary/20 transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "রেস্টুরেন্ট অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs sm:text-sm text-brand-dark/60">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/login"
          className="font-bold text-primary hover:underline transition-all"
        >
          লগইন করুন
        </Link>
      </div>
    </div>
  );
}
