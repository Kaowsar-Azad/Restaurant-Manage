/**
 * --------------------------------------------------------------------------
 * রিইউজেবল বাটন কম্পোনেন্ট (src/components/ui/Button.jsx)
 * --------------------------------------------------------------------------
 * 📌 এই কম্পোনেন্টের দায়িত্ব:
 *    - পুরো অ্যাপ্লিকেশনে একই ডিজাইন ও থিমের বাটন সরবরাহ করা।
 *    - ভ্যারিয়েন্ট সাপোর্ট: 'primary' (ব্র্যান্ড অ্যাকসেন্ট), 'secondary', 
 *      'danger' (লাল রঙের বাটন), 'outline', 'ghost'।
 *    - লোডিং স্টেট (Spinner) এবং ডিজাবলড স্টেট হ্যান্ডেল করা।
 * 
 * 💡 ব্যবহারবিধি (Example):
 *    <Button variant="primary" loading={isLoading} onClick={handleClick}>
 *      সংরক্ষণ করুন
 *    </Button>
 * --------------------------------------------------------------------------
 */

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-brand-accent text-brand-dark hover:brightness-105 active:scale-[0.98] shadow-sm",
    secondary:
      "bg-white/10 text-brand-dark hover:bg-white/20 active:scale-[0.98] border border-black/5",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 active:scale-[0.98] shadow-sm",
    outline:
      "border-2 border-brand-dark/20 text-brand-dark hover:border-brand-dark hover:bg-black/5",
    ghost:
      "text-brand-dark/70 hover:text-brand-dark hover:bg-black/5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>লোড হচ্ছে...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
