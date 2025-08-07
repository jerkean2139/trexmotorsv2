import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Vehicle } from "@shared/schema";

interface BulkImageImportProps {
  onClose: () => void;
  vehicles: Vehicle[];
}

export default function BulkImageImport({ onClose, vehicles }: BulkImageImportProps) {
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");
  const [mappingData, setMappingData] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: async (updates: { vehicleId: string; imageUrls: string[] }[]) => {
      const results = await Promise.all(
        updates.map(({ vehicleId, imageUrls }) =>
          apiRequest("PUT", `/api/vehicles/${vehicleId}`, { images: imageUrls })
        )
      );
      return results;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Vehicle images updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
      onClose();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to update vehicle images", 
        variant: "destructive" 
      });
      console.error("Bulk update error:", error);
    },
  });

  const handleBulkImport = async () => {
    if (!mappingData.trim()) {
      toast({
        title: "Error",
        description: "Please provide the vehicle-to-image mapping data",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Parse the mapping data (expecting JSON format)
      const mappings = JSON.parse(mappingData);
      
      // Validate and prepare updates
      const updates: { vehicleId: string; imageUrls: string[] }[] = [];
      
      for (const mapping of mappings) {
        const vehicle = vehicles.find(v => 
          v.stockNumber === mapping.stockNumber || 
          v.vin === mapping.vin ||
          `${v.make} ${v.model}`.toLowerCase() === mapping.vehicleName?.toLowerCase()
        );
        
        if (vehicle && mapping.imageUrls && Array.isArray(mapping.imageUrls)) {
          updates.push({
            vehicleId: vehicle.id,
            imageUrls: mapping.imageUrls
          });
        }
      }

      if (updates.length === 0) {
        toast({
          title: "Error",
          description: "No matching vehicles found for the provided data",
          variant: "destructive"
        });
        return;
      }

      // Execute bulk update
      await bulkUpdateMutation.mutateAsync(updates);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid mapping data format. Please check your JSON.",
        variant: "destructive"
      });
      console.error("Import error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const exampleFormat = `[
  {
    "stockNumber": "STOCK001",
    "vehicleName": "2020 Toyota Camry",
    "imageUrls": [
      "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      "https://drive.google.com/file/d/ANOTHER_FILE_ID/view"
    ]
  },
  {
    "stockNumber": "STOCK002", 
    "vin": "1HGBH41JXMN109186",
    "imageUrls": [
      "https://drive.google.com/file/d/THIRD_FILE_ID/view"
    ]
  }
]`;

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bulk Import Vehicle Images</h3>
        <p className="text-gray-600 mb-4">
          Import multiple vehicle images from Google Drive using direct sharing links.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Step 1: Google Drive Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <strong>1. Make your images publicly accessible:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
              <li>Right-click your Google Drive folder containing vehicle images</li>
              <li>Select "Share" → "Anyone with the link can view"</li>
              <li>Get the direct sharing link for each image</li>
            </ul>
          </div>
          <div>
            <strong>2. Convert Drive links to direct image URLs:</strong>
            <p className="text-gray-600 ml-4">
              Change <code>https://drive.google.com/file/d/FILE_ID/view</code><br/>
              to <code>https://drive.google.com/uc?export=view&id=FILE_ID</code>
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="googleDriveUrl">Google Drive Folder URL (Optional Reference)</Label>
        <Input
          id="googleDriveUrl"
          type="url"
          placeholder="https://drive.google.com/drive/folders/..."
          value={googleDriveUrl}
          onChange={(e) => setGoogleDriveUrl(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="mappingData">Vehicle-to-Image Mapping (JSON Format)</Label>
        <Textarea
          id="mappingData"
          placeholder="Paste your vehicle-to-image mapping JSON here..."
          value={mappingData}
          onChange={(e) => setMappingData(e.target.value)}
          rows={12}
          className="mt-1 font-mono text-sm"
        />
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Expected JSON Format:</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-white p-3 rounded border">
            {exampleFormat}
          </pre>
          <p className="text-xs text-gray-600 mt-2">
            You can match vehicles by stockNumber, VIN, or vehicleName (make + model).
            Use direct Google Drive image URLs for best performance.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleBulkImport}
          className="bg-trex-green hover:bg-trex-green text-white"
          disabled={isProcessing || bulkUpdateMutation.isPending}
        >
          {isProcessing || bulkUpdateMutation.isPending ? "Processing..." : "Import Images"}
        </Button>
      </div>
    </div>
  );
}