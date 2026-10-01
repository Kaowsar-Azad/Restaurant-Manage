import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-brand-white p-10 rounded-2xl shadow-xl shadow-black/5">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-brand-dark">
          Welcome Back
        </h1>
        <p className="text-brand-dark/60 text-sm">
          Enter your credentials to access the dashboard
        </p>
      </div>

      <form className="space-y-6">
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
            placeholder="••••••••"
            className="w-full px-0 py-2 bg-transparent border-b border-brand-dark/20 focus:border-brand-dark focus:outline-none transition-colors placeholder:text-brand-dark/30 text-brand-dark"
          />
        </div>

        <button
          type="button"
          className="w-full py-4 mt-8 bg-brand-accent text-brand-dark font-semibold rounded-lg hover:bg-[#e4fa9c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Sign In
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
