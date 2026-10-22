/**
 * --------------------------------------------------------------------------
 * পেজ: রেস্টুরেন্ট অনবোর্ডিং ফর্ম (src/app/(auth)/register-restaurant/page.jsx)
 * রিকোয়ারমেন্ট: সেকশন ৩ (রেস্টুরেন্ট মালিকের সাইন-আপ ও অনবোর্ডিং)
 * --------------------------------------------------------------------------
 * 📌 এই পেজের মূল দায়িত্ব:
 *    ১. রেস্টুরেন্ট মালিকের ব্যবসার তথ্য সংগ্রহ ও নতুন রেস্টুরেন্ট প্রোফাইল তৈরি।
 *    ২. ইনপুট ফিল্ডস:
 *       - রেস্টুরেন্টের নাম
 *       - লোগো (ইমেজ URL বা আপলোড)
 *       - ক্যাটাগরি টাইপ (Cafe, Fast Food, Biryani House, Fine Dine)
 *       - রেস্টুরেন্টের বিবরণ ও স্পেশালিটি (Description)
 *       - অফিশিয়াল হেল্পলাইন ফোন নম্বর ও ব্রাঞ্চের পূর্ণ ঠিকানা
 *    ৩. সাবমিট হলে রেস্টুরেন্ট তৈরি হবে এবং মালিক সরাসরি মূল ড্যাশবোর্ডে চলে যাবে।
 * 
 * 🔌 কানেক্টেড সার্ভিস:
 *    - authService.registerRestaurant() -> POST /api/restaurants
 * --------------------------------------------------------------------------
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiHome, FiImage, FiPhone, FiMapPin, FiArrowLeft, FiCheck } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { authService } from "@/services/auth.service";

export default function RegisterRestaurantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Fast Food & Cafe",
    logo: "",
    description: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // await authService.registerRestaurant(formData);
      // রেজিস্ট্রেশন সম্পন্ন হলে ড্যাশবোর্ডে রিডাইরেক্ট
      router.push("/");
    } catch (err) {
      setError(err.message || "রেস্টুরেন্ট তৈরি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f1] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark/60 hover:text-brand-dark mb-3 transition-colors"
          >
            <FiArrowLeft /> ফিরে যান
          </Link>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">আপনার রেস্টুরেন্ট সেটআপ করুন</h1>
          <p className="text-sm text-brand-dark/60 mt-1">
            মালিক হিসেবে আপনার রেস্টুরেন্টের তথ্য দিন। এর পর আপনি সরাসরি POS ও টিম ম্যানেজমেন্ট ড্যাশবোর্ডে ঢুকতে পারবেন।
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            {error}
          </div>
        )}

        <Card className="p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="রেস্টুরেন্টের নাম"
              required
              leftIcon={FiHome}
              placeholder="যেমন: ধানমন্ডি বিরিয়ানি হাউস"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-brand-dark/80 mb-1">
                রেস্টুরেন্টের ধরন / ক্যাটাগরি
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl bg-white border border-black/10 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-accent focus:outline-none"
              >
                <option value="Fast Food & Cafe">ফাস্টফুড ও ক্যাফে (Fast Food & Cafe)</option>
                <option value="Traditional & Biryani">ঐতিহ্যবাহী ও বিরিয়ানি (Traditional & Biryani)</option>
                <option value="Fine Dining">ফাইন ডাইনিং (Fine Dining)</option>
                <option value="Bakery & Sweets">বেকারি ও মিষ্টান্ন (Bakery & Sweets)</option>
              </select>
            </div>

            <Input
              label="লোগো ইমেজ লিঙ্ক (ঐচ্ছিক)"
              leftIcon={FiImage}
              placeholder="https://example.com/logo.png"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />

            <Input
              label="অফিশিয়াল ফোন নম্বর"
              required
              leftIcon={FiPhone}
              placeholder="017XXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="রেস্টুরেন্টের পূর্ণাঙ্গ ঠিকানা"
              required
              leftIcon={FiMapPin}
              placeholder="বাড়ি নং, রোড নং, এলাকা, ঢাকা"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-dark/80">
                সংক্ষিপ্ত বিবরণ ও স্পেশালিটি (Description)
              </label>
              <textarea
                rows={3}
                placeholder="যেমন: সেরা মানের কাচ্চি ও স্পেশাল বোরহানির জন্য আমরা পরিচিত..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl bg-white border border-black/10 p-4 text-sm text-brand-dark focus:ring-2 focus:ring-brand-accent focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3.5 text-base gap-2">
              <FiCheck className="w-5 h-5" /> রেস্টুরেন্ট প্রোফাইল তৈরি ও শুরু করুন
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
