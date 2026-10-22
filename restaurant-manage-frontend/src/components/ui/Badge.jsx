/**
 * --------------------------------------------------------------------------
 * রিইউজেবল স্ট্যাটাস ব্যাজ (src/components/ui/Badge.jsx)
 * --------------------------------------------------------------------------
 * 📌 এই কম্পোনেন্টের দায়িত্ব:
 *    - যেকোনো স্ট্যাটাস যেমন: 'Available', 'Out of Stock', 'Occupied', 
 *      'Vacant', 'Paid', 'Pending' ইত্যাদি কালার কোডেড ব্যাজ হিসেবে দেখানো।
 * 
 * 💡 ব্যবহারবিধি (Example):
 *    <Badge variant="danger">Out of Stock</Badge>
 *    <Badge variant="success">Available</Badge>
 * --------------------------------------------------------------------------
 */

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  const variantStyles = {
    default: "bg-black/5 text-brand-dark/80 border border-black/5",
    accent: "bg-brand-accent/40 text-brand-dark font-bold border border-brand-accent/60",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
    warning: "bg-amber-50 text-amber-700 border border-amber-200 font-semibold",
    danger: "bg-rose-50 text-rose-600 border border-rose-200 font-bold",
    info: "bg-sky-50 text-sky-700 border border-sky-200 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
        sizeStyles[size] || sizeStyles.sm
      } ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {children}
    </span>
  );
}
