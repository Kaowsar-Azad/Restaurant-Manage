/**
 * --------------------------------------------------------------------------
 * রিইউজেবল ইনপুট কম্পোনেন্ট (src/components/ui/Input.jsx)
 * --------------------------------------------------------------------------
 * 📌 এই কম্পোনেন্টের দায়িত্ব:
 *    - ফর্মের সমস্ত টেক্সট, নাম্বার, পাসওয়ার্ড এবং সার্চ ইনপুট স্ট্যান্ডার্ড রাখা।
 *    - স্বয়ংক্রিয় লেবেল (Label), বাধ্যতামূলক অ্যাস্ট্যারিস্ক (*), এবং এরর মেসেজ রেন্ডার করা।
 *    - আইকন সাপোর্ট (Left Icon বা Right Icon)।
 * 
 * 💡 ব্যবহারবিধি (Example):
 *    <Input
 *      label="খাবারের নাম"
 *      required
 *      placeholder="যেমন: চিকেন বিরিয়ানি"
 *      value={foodName}
 *      onChange={(e) => setFoodName(e.target.value)}
 *      error={errors.foodName}
 *    />
 * --------------------------------------------------------------------------
 */

export default function Input({
  label,
  id,
  type = "text",
  required = false,
  error = "",
  helperText = "",
  leftIcon: LeftIcon,
  className = "",
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-brand-dark/80 tracking-wide"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-dark/40">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={`w-full rounded-xl bg-white border transition-all duration-200 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent ${
            LeftIcon ? "pl-10" : "px-4"
          } py-2.5 ${
            error
              ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
              : "border-black/10 hover:border-black/20"
          } ${className}`}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-brand-dark/50">{helperText}</p>}
    </div>
  );
}
