import { FiPlus, FiSearch, FiMoreVertical } from "react-icons/fi";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Customers</h1>
          <p className="text-brand-dark/60 text-sm">View and manage your customer database.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <FiPlus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </header>

      <div className="bg-brand-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-brand-bg/30">
          <div className="flex items-center gap-4 bg-brand-white px-4 py-2 rounded-lg border border-black/5 w-80">
            <FiSearch className="text-brand-dark/40" />
            <input type="text" placeholder="Search by name, email or phone..." className="bg-transparent border-none outline-none text-sm w-full text-brand-dark" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-brand-bg/50 text-brand-dark/60 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Total Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Last Order</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-brand-bg/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-accent flex items-center justify-center font-bold text-sm">
                        JD
                      </div>
                      <span className="font-semibold text-brand-dark">John Doe {i}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-brand-dark">+1 (555) 012-345{i}</p>
                    <p className="text-xs text-brand-dark/50">john.doe{i}@example.com</p>
                  </td>
                  <td className="px-6 py-4 text-brand-dark text-sm font-medium">1{i}</td>
                  <td className="px-6 py-4 text-brand-dark text-sm font-bold">${145.50 * i}</td>
                  <td className="px-6 py-4 text-brand-dark/60 text-sm">Oct 02, 2026</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-dark/40 hover:text-brand-dark p-2 rounded-md hover:bg-black/5 transition-colors">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
