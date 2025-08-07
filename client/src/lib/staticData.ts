// Static vehicle data for Netlify deployment
import type { Vehicle } from "@shared/schema";

export const staticVehicles: Vehicle[] = [
  {
    id: "static-1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: "22500",
    mileage: 45000,
    exteriorColor: "Silver",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    engine: "2.5L I4",
    drivetrain: "FWD",
    trim: null,
    seatingCapacity: 5,
    vin: "1HGBH41JXMN109186",
    stockNumber: "TR001",
    status: "available",
    statusBanner: null,
    description: "Reliable and fuel-efficient sedan perfect for daily commuting. Well-maintained with complete service history.",
    features: ["Backup Camera", "Bluetooth", "Cruise Control", "Power Windows"],
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    isFeatured: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "static-2",
    make: "Honda", 
    model: "CR-V",
    year: 2019,
    price: "26800",
    mileage: 38000,
    exteriorColor: "White",
    interiorColor: "Gray",
    transmission: "Automatic",
    fuelType: "Gasoline", 
    engine: "1.5L Turbo",
    drivetrain: "AWD",
    trim: "EX",
    seatingCapacity: 7,
    vin: "5J6RW2H85KA012345",
    stockNumber: "TR002",
    status: "available",
    statusBanner: null,
    description: "Spacious and versatile SUV with all-wheel drive. Perfect for families and adventure seekers.",
    features: ["AWD", "Sunroof", "Heated Seats", "Apple CarPlay", "Lane Keeping Assist"],
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    isFeatured: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "static-3",
    make: "Ford",
    model: "F-150", 
    year: 2021,
    price: "35900",
    mileage: 28000,
    exteriorColor: "Blue",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    engine: "3.5L V6 EcoBoost",
    drivetrain: "4WD",
    trim: "XLT", 
    seatingCapacity: 6,
    vin: "1FTFW1E51MFA12345",
    stockNumber: "TR003",
    status: "available",
    statusBanner: null, 
    description: "Powerful and capable pickup truck with 4WD. Perfect for work and recreation with excellent towing capacity.",
    features: ["4WD", "Tow Package", "Bed Liner", "Navigation", "SYNC 3"],
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    isFeatured: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  }
];

export const getStaticVehicles = async (filters?: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = staticVehicles;
  
  if (filters) {
    if (filters.make) {
      filtered = filtered.filter(v => v.make.toLowerCase().includes(filters.make.toLowerCase()));
    }
    if (filters.model) {
      filtered = filtered.filter(v => v.model.toLowerCase().includes(filters.model.toLowerCase()));
    }
    if (filters.yearMin) {
      filtered = filtered.filter(v => v.year >= parseInt(filters.yearMin));
    }
    if (filters.yearMax) {
      filtered = filtered.filter(v => v.year <= parseInt(filters.yearMax));
    }
    if (filters.priceMin) {
      filtered = filtered.filter(v => parseInt(v.price) >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(v => parseInt(v.price) <= parseInt(filters.priceMax));
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.make.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        (v.description && v.description.toLowerCase().includes(query))
      );
    }
  }
  
  return {
    vehicles: filtered,
    totalCount: filtered.length,
    hasMore: false
  };
};

export const getFeaturedVehicles = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return staticVehicles.filter(v => v.isFeatured);
};