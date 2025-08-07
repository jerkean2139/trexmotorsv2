// Real T-Rex Motors vehicle data - simplified for Netlify deployment
import type { Vehicle } from "@shared/schema";

export const realVehicles: Vehicle[] = [
  {
    id: "8d0e5294-b1be-442d-a52f-8e45f08b428a",
    make: "Chevrolet",
    model: "Cruze",
    year: 2014,
    trim: null,
    price: "9999.00",
    mileage: 103903,
    exteriorColor: "DARK GREEN",
    interiorColor: "Tan",
    fuelType: "gasoline",
    transmission: "Automatic",
    drivetrain: "FWD",
    engine: null,
    seatingCapacity: null,
    description: "one touch windows, folding side/driver mirror, cruise, 12v power outlet",
    features: null,
    images: [
      "https://drive.google.com/uc?export=view&id=14nKcHrwgfPzk34H7WReO20nNZgbPDXoO",
      "https://drive.google.com/uc?export=view&id=1V1YvrqpskSHa7Fb19gGfWoLjPf9mpn_4",
      "https://drive.google.com/uc?export=view&id=1taYD4NiJHehVqH2yOvDncfxhXyWPUtMM",
      "https://drive.google.com/uc?export=view&id=13nj6gsMpG8Q0gUJcEOinJnlc67qPljkd"
    ],
    status: "available",
    statusBanner: null,
    stockNumber: "1052",
    vin: "1G1PB5SG7E7352046",
    isFeatured: false,
    createdAt: new Date("2025-08-07T04:47:45.485Z"),
    updatedAt: new Date("2025-08-07T04:47:45.485Z")
  },
  {
    id: "cd96725b-24ee-4d04-9c39-d45c01064d88",
    make: "Buick",
    model: "Enclave",
    year: 2015,
    trim: null,
    price: "14999.00",
    mileage: 113800,
    exteriorColor: "RED",
    interiorColor: "beige",
    fuelType: "gasoline",
    transmission: "Automatic",
    drivetrain: "AWD",
    engine: null,
    seatingCapacity: null,
    description: "Back up camera, heated/cooled seats, power everything",
    features: null,
    images: [
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/8917743c-1709-41eb-ab41-244dea63cd32.jpeg",
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/e9f6654b-9d8b-4b0f-8985-90c073b39584.jpeg"
    ],
    status: "available",
    statusBanner: null,
    stockNumber: "1050",
    vin: "5GAKVCED4FJ313669",
    isFeatured: true,
    createdAt: new Date("2025-08-07T04:47:45.493Z"),
    updatedAt: new Date("2025-08-07T04:47:45.493Z")
  },
  {
    id: "4a526d42-4522-4e00-8a57-03b8afd9d38b",
    make: "Ford",
    model: "F-150",
    year: 2018,
    trim: "SuperCrew Cab",
    price: "31999.00",
    mileage: 89654,
    exteriorColor: "BLACK",
    interiorColor: "BLACK",
    fuelType: "gasoline",
    transmission: "Automatic",
    drivetrain: "4WD",
    engine: "5.0L V8",
    seatingCapacity: null,
    description: "SUPERCREW CAB 4WD 157'' WB, BACK-UP CAMERA, REMOTE START, BED LINER",
    features: null,
    images: [
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/68042b0029d629c59c352b1e.jpeg",
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/68042b0129d629c59c352b25.jpeg"
    ],
    status: "available",
    statusBanner: null,
    stockNumber: "1051",
    vin: "1FTFW1E59JFA10663",
    isFeatured: true,
    createdAt: new Date("2025-08-07T04:47:45.496Z"),
    updatedAt: new Date("2025-08-07T04:47:45.496Z")
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    make: "Jeep",
    model: "Wrangler",
    year: 2017,
    trim: "Unlimited Sport",
    price: "28999.00",
    mileage: 76543,
    exteriorColor: "BLUE",
    interiorColor: "BLACK",
    fuelType: "gasoline",
    transmission: "Manual",
    drivetrain: "4WD",
    engine: "3.6L V6",
    seatingCapacity: 5,
    description: "4 Door Unlimited Sport with removable doors and roof. Perfect for off-road adventures!",
    features: ["Removable Doors", "Removable Roof", "4x4", "Rock Rails"],
    images: [
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/68042b0229d629c59c352b2c.jpeg"
    ],
    status: "available",
    statusBanner: null,
    stockNumber: "1053",
    vin: "1C4HJWEG5HL123456",
    isFeatured: true,
    createdAt: new Date("2025-08-07T04:47:45.500Z"),
    updatedAt: new Date("2025-08-07T04:47:45.500Z")
  },
  {
    id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    make: "Honda",
    model: "Civic",
    year: 2019,
    trim: "LX",
    price: "18999.00",
    mileage: 45000,
    exteriorColor: "WHITE",
    interiorColor: "BLACK",
    fuelType: "gasoline",
    transmission: "CVT",
    drivetrain: "FWD",
    engine: "2.0L 4-Cylinder",
    seatingCapacity: 5,
    description: "Fuel efficient sedan with excellent reliability record. Great first car!",
    features: ["Honda Sensing", "Backup Camera", "Bluetooth", "Apple CarPlay"],
    images: [
      "https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/68042b0329d629c59c352b33.jpeg"
    ],
    status: "available",
    statusBanner: null,
    stockNumber: "1054",
    vin: "19XFC2F59KE123456",
    isFeatured: false,
    createdAt: new Date("2025-08-07T04:47:45.503Z"),
    updatedAt: new Date("2025-08-07T04:47:45.503Z")
  }
];

export const getVehiclesForNetlify = async (filters?: any) => {
  // Simulate slight delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = realVehicles;
  
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
      filtered = filtered.filter(v => parseFloat(v.price) >= parseFloat(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(v => parseFloat(v.price) <= parseFloat(filters.priceMax));
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

export const getFeaturedVehiclesForNetlify = async () => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return realVehicles.filter(v => v.isFeatured);
};