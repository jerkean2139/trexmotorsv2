import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@shared/schema";

interface DriveAnalyzerProps {
  vehicles: Vehicle[];
  onMappingGenerated: (mapping: string) => void;
}

export default function DriveAnalyzer({ vehicles, onMappingGenerated }: DriveAnalyzerProps) {
  const [folderList, setFolderList] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeAndMatch = () => {
    if (!folderList.trim()) {
      return;
    }

    setIsAnalyzing(true);
    
    // Parse the folder list (user can paste folder names)
    const folders = folderList.split('\n').map(f => f.trim()).filter(f => f);
    
    // Smart matching algorithm
    const matchedVehicles = vehicles.map(vehicle => {
      const stockNum = vehicle.stockNumber;
      const vehicleId = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
      
      // Find matching folder
      const matchedFolder = folders.find(folder => {
        const folderLower = folder.toLowerCase();
        const stockLower = stockNum.toLowerCase();
        const vehicleLower = vehicleId.toLowerCase();
        
        return (
          folderLower.includes(stockLower) ||
          folderLower.includes(vehicleLower) ||
          folderLower.includes(vehicle.make.toLowerCase()) && folderLower.includes(vehicle.model.toLowerCase()) ||
          stockLower.includes(folderLower.replace(/\s/g, ''))
        );
      });

      return {
        stockNumber: stockNum,
        vehicleName: vehicleId,
        vin: vehicle.vin,
        matchedFolder: matchedFolder || `NO_MATCH_FOR_${stockNum}`,
        confidence: matchedFolder ? "HIGH" : "MANUAL_NEEDED",
        imageUrls: [
          `https://drive.google.com/uc?export=view&id=${matchedFolder ? 'REPLACE_WITH_FILE_ID_1' : 'NO_FOLDER_FOUND'}`,
          `https://drive.google.com/uc?export=view&id=${matchedFolder ? 'REPLACE_WITH_FILE_ID_2' : 'NO_FOLDER_FOUND'}`,
          `https://drive.google.com/uc?export=view&id=${matchedFolder ? 'REPLACE_WITH_FILE_ID_3' : 'NO_FOLDER_FOUND'}`
        ]
      };
    });

    const mapping = JSON.stringify(matchedVehicles, null, 2);
    onMappingGenerated(mapping);
    setIsAnalyzing(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          🔍 Smart Folder Analyzer
          <Badge variant="outline">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="folderList">Paste Your Google Drive Folder Names</Label>
          <textarea
            id="folderList"
            className="w-full h-32 p-3 border rounded text-sm font-mono"
            placeholder={`Paste your folder names here, one per line. For example:

STOCK001 - 2020 Toyota Camry
STOCK002 - 2019 Ford F-150  
2018 Honda Civic - STOCK003
BMW 330i 2021
Tesla Model 3

I'll automatically match them to your vehicles!`}
            value={folderList}
            onChange={(e) => setFolderList(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Copy and paste the folder names from your Google Drive. I'll match them to your 21 vehicles automatically.
          </p>
        </div>

        <Button
          onClick={analyzeAndMatch}
          disabled={!folderList.trim() || isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isAnalyzing ? "Analyzing..." : "🎯 Auto-Match Folders to Vehicles"}
        </Button>

        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <strong>How it works:</strong> I'll compare your folder names against stock numbers, make/model combinations, 
          and common naming patterns to automatically create the JSON mapping for bulk import.
        </div>
      </CardContent>
    </Card>
  );
}