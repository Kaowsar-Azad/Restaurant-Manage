import { FiPlus, FiMoreVertical } from "react-icons/fi";

export default function TablesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Restaurant Tables</h1>
          <p className="text-brand-dark/60 text-sm">Manage tables and view their current status.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <FiPlus className="w-5 h-5" />
          <span>Add Table</span>
        </button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => {
          const isOccupied = table % 3 === 0;
          return (
            <div 
              key={table} 
              className={`relative bg-brand-white rounded-2xl border ${isOccupied ? 'border-brand-dark shadow-md' : 'border-black/5 shadow-sm'} overflow-hidden group transition-all`}
            >
              <div className={`h-2 ${isOccupied ? 'bg-brand-dark' : 'bg-brand-bg'}`}></div>
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${isOccupied ? 'bg-brand-dark text-brand-accent' : 'bg-brand-bg text-brand-dark'}`}>
                  <span className="text-2xl font-bold">{table}</span>
                </div>
                <h3 className="font-bold text-brand-dark text-lg">Table {table}</h3>
                <p className="text-xs text-brand-dark/60 mt-1">Capacity: 4</p>
                
                <div className="mt-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block ${isOccupied ? 'bg-yellow-100 text-yellow-800' : 'bg-[#f2ffbd] text-brand-dark'}`}>
                    {isOccupied ? 'Occupied' : 'Available'}
                  </span>
                </div>
              </div>
              
              <button className="absolute top-3 right-3 text-brand-dark/40 hover:text-brand-dark p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMoreVertical />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
