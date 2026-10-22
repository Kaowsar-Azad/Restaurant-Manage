/**
 * --------------------------------------------------------------------------
 * রিইউজেবল মোডাল পপআপ কম্পোনেন্ট (src/components/ui/Modal.jsx)
 * --------------------------------------------------------------------------
 * 📌 এই কম্পোনেন্টের দায়িত্ব:
 *    - যেকোনো ফর্ম, কনফার্মেশন বা ডিটেইলস পপআপ ডায়ালগ হিসেবে প্রদর্শন করা।
 *    - ব্যাকড্রপ ব্লার (Backdrop blur) এবং ক্লিক করে বন্ধ করার ব্যবস্থা।
 *    - হেডার, বডি ও ফুটার এরিয়া সুসংগঠিত রাখা।
 * 
 * 💡 ব্যবহারবিধি (Example):
 *    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="নতুন খাবার যোগ করুন">
 *      <FoodForm />
 *    </Modal>
 * --------------------------------------------------------------------------
 */

import { FiX } from "react-icons/fi";

export default function Modal({
  isOpen = false,
  onClose = () => {},
  title = "",
  description = "",
  children,
  maxWidth = "max-w-lg",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in-0 zoom-in-95`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-black/5">
          <div>
            {title && <h3 className="text-lg font-bold text-brand-dark tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-brand-dark/60 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-dark/40 hover:text-brand-dark hover:bg-black/5 transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
