import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CarFront, Plus, RefreshCw, Trash2 } from 'lucide-react';

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
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: 2024, pricePerDay: 50 });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data.cars || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
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
    try {
      await axios.delete(`${API_URL}/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CarFront size={36} className="text-blue-600" />
            CarRental <span className="text-blue-600">Pro</span>
          </h1>
          <button 
            onClick={fetchCars}
            className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-green-600" />
              Add New Car
            </h2>
            <form onSubmit={handleAddCar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input 
                  type="text" 
                  value={newCar.brand}
                  onChange={e => setNewCar({...newCar, brand: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Toyota, Tesla..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input 
                  type="text" 
                  value={newCar.model}
                  onChange={e => setNewCar({...newCar, model: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Corolla, Model 3..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input 
                    type="number" 
                    value={newCar.year}
                    onChange={e => setNewCar({...newCar, year: +e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">$/Day</label>
                  <input 
                    type="number" 
                    value={newCar.pricePerDay}
                    onChange={e => setNewCar({...newCar, pricePerDay: +e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-2"
              >
                Add Car
              </button>
            </form>
          </div>

          {/* List */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Available Fleet</h2>
            {loading && cars.length === 0 ? (
              <div className="text-center py-10 text-gray-500">Loading cars...</div>
            ) : cars.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow">
                No cars available yet. Add one to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {cars.map(car => (
                  <div key={car.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-600 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Year: {car.year}</span>
                        <span className="font-semibold text-blue-600">${car.pricePerDay}/day</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {car.isAvailable ? 'Available' : 'Rented'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
