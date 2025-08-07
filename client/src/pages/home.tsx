import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import VehicleCard from "@/components/VehicleCard";
import VehicleDetail from "@/components/VehicleDetail";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@shared/schema";

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
    searchQuery: "",
    sortBy: "price-asc",
  });

  const { data: vehiclesData, isLoading } = useQuery<{vehicles: Vehicle[], totalCount: number}>({
    queryKey: ["/api/vehicles", filters],
    queryFn: async ({ queryKey }) => {
      const [url, params] = queryKey;
      const searchParams = new URLSearchParams();
      
      Object.entries(params as any).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value as string);
        }
      });

      const response = await fetch(`${url}?${searchParams}`);
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      return response.json();
    },
  });

  const { data: featuredVehicles, isLoading: featuredLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles/featured"],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Classic American muscle car - representing T-Rex Motors automotive excellence" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Quality Used Cars in <span className="text-trex-green">Richmond</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Discover your next vehicle from our extensive inventory of quality pre-owned cars, trucks, and SUVs. 
              Competitive pricing, financing available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-trex-green hover:bg-trex-green text-white px-8 py-3 text-lg font-semibold"
                onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <i className="fas fa-search mr-2"></i>Browse Inventory
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 text-lg font-semibold"
              >
                <i className="fas fa-calculator mr-2"></i>Get Financing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Vehicle Inventory */}
      <section id="inventory" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {filters.searchQuery || Object.values(filters).some(v => v && v !== "price-asc") 
                ? "Search Results" 
                : "Featured Vehicles"
              }
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {vehiclesData?.totalCount || 0} vehicles found
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(vehiclesData?.vehicles || featuredVehicles || []).map((vehicle: Vehicle) => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onClick={handleVehicleSelect}
                />
              ))}
            </div>
          )}

          {(!isLoading && (!vehiclesData?.vehicles?.length && !featuredVehicles?.length)) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
              <Button 
                onClick={() => setFilters({
                  make: "",
                  model: "",
                  yearMin: "",
                  yearMax: "",
                  priceMin: "",
                  priceMax: "",
                  searchQuery: "",
                  sortBy: "price-asc",
                })}
                className="mt-4 bg-trex-green hover:bg-trex-green text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetail 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}

      <Footer />
    </div>
  );
}
