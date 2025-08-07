import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Vehicle, InsertVehicle } from "@shared/schema";

interface AdminVehicleFormProps {
  vehicle?: Vehicle | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminVehicleForm({ vehicle, onSuccess, onCancel }: AdminVehicleFormProps) {
  const [formData, setFormData] = useState<InsertVehicle>({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    trim: vehicle?.trim || '',
    price: vehicle?.price || '0',
    mileage: vehicle?.mileage || 0,
    exteriorColor: vehicle?.exteriorColor || '',
    interiorColor: vehicle?.interiorColor || '',
    fuelType: vehicle?.fuelType || 'gasoline',
    transmission: vehicle?.transmission || '',
    drivetrain: vehicle?.drivetrain || '',
    engine: vehicle?.engine || '',
    seatingCapacity: vehicle?.seatingCapacity || 5,
    description: vehicle?.description || '',
    features: vehicle?.features || [],
    images: vehicle?.images || [],
    status: vehicle?.status || 'available',
    statusBanner: vehicle?.statusBanner || null,
    stockNumber: vehicle?.stockNumber || '',
    vin: vehicle?.vin || '',
    isFeatured: vehicle?.isFeatured || false,
  });

  const [newFeature, setNewFeature] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const vehicleMutation = useMutation({
    mutationFn: async (data: InsertVehicle) => {
      if (vehicle) {
        return apiRequest("PUT", `/api/vehicles/${vehicle.id}`, data);
      } else {
        return apiRequest("POST", "/api/vehicles", data);
      }
    },
    onSuccess: () => {
      toast({ 
        title: "Success", 
        description: vehicle ? "Vehicle updated successfully" : "Vehicle created successfully" 
      });
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
      onSuccess();
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to save vehicle", 
        variant: "destructive" 
      });
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = formData.features?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, features: updatedFeatures });
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    vehicleMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            value={formData.make}
            onChange={(e) => handleChange('make', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            min="1990"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) => handleChange('year', parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="trim">Trim</Label>
          <Input
            id="trim"
            value={formData.trim || ''}
            onChange={(e) => handleChange('trim', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            type="number"
            value={formData.mileage}
            onChange={(e) => handleChange('mileage', parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="exteriorColor">Exterior Color</Label>
          <Input
            id="exteriorColor"
            value={formData.exteriorColor}
            onChange={(e) => handleChange('exteriorColor', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="interiorColor">Interior Color</Label>
          <Input
            id="interiorColor"
            value={formData.interiorColor || ''}
            onChange={(e) => handleChange('interiorColor', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={formData.fuelType} onValueChange={(value) => handleChange('fuelType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Input
            id="transmission"
            value={formData.transmission}
            onChange={(e) => handleChange('transmission', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="drivetrain">Drivetrain</Label>
          <Select value={formData.drivetrain || "fwd"} onValueChange={(value) => handleChange('drivetrain', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fwd">FWD</SelectItem>
              <SelectItem value="rwd">RWD</SelectItem>
              <SelectItem value="awd">AWD</SelectItem>
              <SelectItem value="4wd">4WD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="engine">Engine</Label>
          <Input
            id="engine"
            value={formData.engine || ''}
            onChange={(e) => handleChange('engine', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="seatingCapacity">Seating Capacity</Label>
          <Input
            id="seatingCapacity"
            type="number"
            min="1"
            max="8"
            value={formData.seatingCapacity || ''}
            onChange={(e) => handleChange('seatingCapacity', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="stockNumber">Stock Number</Label>
          <Input
            id="stockNumber"
            value={formData.stockNumber || ''}
            onChange={(e) => handleChange('stockNumber', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="vin" className="text-lg font-semibold text-trex-green">VIN Number</Label>
          <Input
            id="vin"
            value={formData.vin || ''}
            onChange={(e) => handleChange('vin', e.target.value)}
            placeholder="Enter 17-character VIN"
            className="font-mono text-lg border-2 border-trex-green/30 focus:border-trex-green"
            maxLength={17}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="statusBanner">Status Banner (Optional)</Label>
          <Select value={formData.statusBanner || "none"} onValueChange={(value) => handleChange('statusBanner', value === "none" ? null : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status banner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Banner</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="low-miles">Low Miles</SelectItem>
              <SelectItem value="local-trade">Local Trade In</SelectItem>
              <SelectItem value="just-reduced">Just Reduced</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter vehicle description..."
        />
      </div>

      {/* Features */}
      <div>
        <Label>Features</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature..."
            />
            <Button type="button" onClick={handleAddFeature} variant="outline">
              Add
            </Button>
          </div>
          <div className="space-y-1">
            {formData.features?.map((feature, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{feature as string}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-600"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image URLs */}
      <div>
        <Label className="text-lg font-semibold">Vehicle Images</Label>
        <div className="space-y-4">
          {/* Bulk Image URL Input */}
          <div>
            <Label className="text-sm text-gray-600">Google Drive Image URLs (one per line)</Label>
            <textarea
              className="w-full h-32 p-3 border rounded text-sm"
              placeholder={`Paste your Google Drive image URLs here, one per line:

https://drive.google.com/uc?export=view&id=FILE_ID_1
https://drive.google.com/uc?export=view&id=FILE_ID_2
https://drive.google.com/uc?export=view&id=FILE_ID_3

Or any other direct image URLs...`}
              value={formData.images?.join('\n') || ''}
              onChange={(e) => {
                const urls = e.target.value.split('\n').map(url => url.trim()).filter(url => url);
                handleChange('images', urls);
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              <strong>Google Drive Setup:</strong> Right-click image → Share → "Anyone with the link" → Copy link. 
              Paste sharing links and they'll be converted to direct image URLs automatically.
            </p>
          </div>
          
          {/* Image Preview */}
          {formData.images && formData.images.length > 0 && (
            <div>
              <Label className="text-sm text-gray-600">Image Preview ({formData.images.length})</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                {formData.images.map((image, index) => {
                  // Convert Google Drive sharing links to direct image URLs for preview
                  let imageUrl = image as string;
                  const driveMatch = imageUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
                  if (driveMatch) {
                    imageUrl = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
                  }
                  
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Vehicle image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-gray-200 group-hover:border-trex-green"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xNSAxMi0zLTMtMy4wMDEgM20xLjUtMi41YTEuNSAxLjUgMCAxIDEgMC0zIDEuNSAxLjUgMCAwIDEgMCAzem0tNi0yaDEwdjhoLTEweiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                        }}
                      />
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isFeatured"
          checked={formData.isFeatured || false}
          onCheckedChange={(checked) => handleChange('isFeatured', !!checked)}
        />
        <Label htmlFor="isFeatured">Featured Vehicle</Label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-trex-green hover:bg-trex-green text-white"
          disabled={vehicleMutation.isPending}
        >
          {vehicleMutation.isPending 
            ? (vehicle ? "Updating..." : "Creating...") 
            : (vehicle ? "Update Vehicle" : "Create Vehicle")
          }
        </Button>
      </div>
    </form>
  );
}
