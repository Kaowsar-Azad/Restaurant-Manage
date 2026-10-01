export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
      {children}
    </div>
  );
}
