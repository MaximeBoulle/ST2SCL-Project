import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CarFront, 
  Plus, 
  RefreshCw, 
  Trash2, 
  Search, 
  LayoutDashboard, 
  Car, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface CarItem {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || (window.location.origin + '/api');

function App() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: 2024, pricePerDay: 50 });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data.cars || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setTimeout(() => setLoading(false), 500); // Small delay for smooth feel
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/cars`, newCar);
      setNewCar({ brand: '', model: '', year: 2024, pricePerDay: 50 });
      fetchCars();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this vehicle from the fleet?')) return;
    try {
      await axios.delete(`${API_URL}/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const filteredCars = cars.filter(car => 
    `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: cars.length,
    available: cars.filter(c => c.isAvailable).length,
    avgPrice: cars.length > 0 ? Math.round(cars.reduce((acc, c) => acc + c.pricePerDay, 0) / cars.length) : 0
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg">
            <CarFront size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">CarRental <span className="text-blue-400">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium transition-all">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Car size={20} /> Fleet
          </button>
        </nav>

        <div className="mt-auto p-4 bg-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Cloud Connected</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Fleet Overview</h1>
            <p className="text-slate-500 mt-1">Manage and track your car rental inventory.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchCars}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin text-blue-600' : 'text-slate-600'} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Fleet', value: stats.total, icon: Car, color: 'blue' },
            { label: 'Available', value: stats.available, icon: CheckCircle2, color: 'emerald' },
            { label: 'Avg. Daily Rate', value: `$${stats.avgPrice}`, icon: DollarSign, color: 'indigo' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold mt-1 text-slate-900">{s.value}</p>
              </div>
              <div className={`p-4 bg-${s.color}-50 text-${s.color}-600 rounded-xl`}>
                <s.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Panel: Fleet List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-bold">Vehicle Inventory</h2>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search model or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
                  />
                </div>
              </div>

              {loading && filteredCars.length === 0 ? (
                <div className="p-20 text-center">
                  <RefreshCw className="animate-spin mx-auto text-blue-600 mb-4" size={32} />
                  <p className="text-slate-500">Synchronizing fleet data...</p>
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="p-20 text-center">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">No vehicles found</h3>
                  <p className="text-slate-500 mt-1">Try adjusting your search or add a new vehicle.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Daily Rate</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCars.map(car => (
                        <tr key={car.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                                {car.brand.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{car.brand}</p>
                                <p className="text-sm text-slate-500">{car.model}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{car.year}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">${car.pricePerDay}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                              car.isAvailable 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {car.isAvailable ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                              {car.isAvailable ? 'Available' : 'Rented'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleDelete(car.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel: Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Add Vehicle</h2>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <TrendingUp size={18} />
                </div>
              </div>

              <form onSubmit={handleAddCar} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Brand</label>
                  <input 
                    type="text" 
                    value={newCar.brand}
                    onChange={e => setNewCar({...newCar, brand: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Porsche, Tesla"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Model</label>
                  <input 
                    type="text" 
                    value={newCar.model}
                    onChange={e => setNewCar({...newCar, model: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Taycan, Model S"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Year</label>
                    <input 
                      type="number" 
                      value={newCar.year}
                      onChange={e => setNewCar({...newCar, year: +e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">$/Day</label>
                    <input 
                      type="number" 
                      value={newCar.pricePerDay}
                      onChange={e => setNewCar({...newCar, pricePerDay: +e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  Register Vehicle
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
