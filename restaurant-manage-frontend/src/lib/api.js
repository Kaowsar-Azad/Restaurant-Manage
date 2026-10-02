export const API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
    : "";
