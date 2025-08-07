import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Vehicle } from "@shared/schema";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'featured':
        return 'bg-trex-green text-white';
      case 'low-miles':
        return 'bg-yellow-500 text-white';
      case 'fuel-efficient':
        return 'bg-blue-500 text-white';
      case 'luxury':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBadgeForVehicle = (vehicle: Vehicle) => {
    if (vehicle.isFeatured) return { text: 'Featured', type: 'featured' };
    if (vehicle.mileage < 30000) return { text: 'Low Miles', type: 'low-miles' };
    if (vehicle.fuelType === 'hybrid' || vehicle.fuelType === 'electric') return { text: 'Fuel Efficient', type: 'fuel-efficient' };
    if (vehicle.make.toLowerCase().includes('lexus') || vehicle.make.toLowerCase().includes('bmw') || vehicle.make.toLowerCase().includes('mercedes')) {
      return { text: 'Luxury', type: 'luxury' };
    }
    return null;
  };

  const badge = getBadgeForVehicle(vehicle);

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(vehicle)}
    >
      <div className="relative">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <i className="fas fa-car text-gray-500 text-4xl"></i>
          </div>
        )}
        {badge && (
          <Badge className={`absolute top-4 right-4 ${getBadgeVariant(badge.type)}`}>
            {badge.text}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
        </div>
        {vehicle.trim && (
          <p className="text-gray-600 mb-4">{vehicle.trim}</p>
        )}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <i className="fas fa-tachometer-alt mr-2 text-trex-green"></i>
            <span>{vehicle.mileage?.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-gas-pump mr-2 text-trex-green"></i>
            <span className="capitalize">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-cogs mr-2 text-trex-green"></i>
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-palette mr-2 text-trex-green"></i>
            <span>{vehicle.exteriorColor}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-trex-green">
            {formatPrice(vehicle.price)}
          </span>
          <Button 
            className="bg-gray-900 hover:bg-gray-800 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onClick(vehicle);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
