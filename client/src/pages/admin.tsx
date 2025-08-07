import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminVehicleForm from "@/components/AdminVehicleForm";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Vehicle } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "trex2025!" });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check authentication status
  const { data: authData } = useQuery({
    queryKey: ["/api/auth/check"],
    queryFn: async () => {
      const response = await fetch("/api/auth/check", { credentials: 'include' });
      return response.json();
    },
  });

  // Get vehicles for admin
  const { data: vehiclesData, isLoading } = useQuery({
    queryKey: ["/api/vehicles"],
    enabled: isAuthenticated || authData?.isAuthenticated,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return apiRequest("POST", "/api/auth/login", credentials);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({ title: "Success", description: "Logged in successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Invalid credentials", variant: "destructive" });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      toast({ title: "Success", description: "Logged out successfully" });
      queryClient.clear();
    },
  });

  // Delete vehicle mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/vehicles/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Vehicle deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete vehicle", variant: "destructive" });
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicleMutation.mutate(id);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  // Show login form if not authenticated
  if (!isAuthenticated && !authData?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <i className="fas fa-car text-trex-green mr-2"></i>
              T-Rex Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-trex-green hover:bg-trex-green text-white"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <i className="fas fa-car text-trex-green text-2xl mr-2"></i>
              <span className="text-xl font-bold">T-Rex Admin</span>
            </div>
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-2 rounded bg-gray-800 text-trex-green font-medium">
                <i className="fas fa-car mr-2"></i>Vehicle Management
              </a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-800 text-gray-300">
                <i className="fas fa-envelope mr-2"></i>Customer Inquiries
              </a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-800 text-gray-300">
                <i className="fas fa-chart-bar mr-2"></i>Sales Reports
              </a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-800 text-gray-300">
                <i className="fas fa-cog mr-2"></i>Settings
              </a>
              <button 
                className="block w-full text-left px-4 py-2 rounded hover:bg-gray-800 text-gray-300"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Management</h1>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-trex-green hover:bg-trex-green text-white"
              >
                <i className="fas fa-plus mr-2"></i>Add New Vehicle
              </Button>
            </div>
          </div>

          {/* Vehicle Management Table */}
          <div className="p-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Current Inventory</CardTitle>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Search vehicles..." 
                      className="w-64"
                    />
                    <Button variant="outline" size="sm">
                      <i className="fas fa-filter"></i>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mileage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {vehiclesData?.vehicles?.map((vehicle: Vehicle) => (
                          <tr key={vehicle.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {vehicle.images?.[0] && (
                                  <div className="flex-shrink-0 h-12 w-16">
                                    <img 
                                      className="h-12 w-16 rounded object-cover" 
                                      src={vehicle.images[0]} 
                                      alt={`${vehicle.make} ${vehicle.model}`}
                                    />
                                  </div>
                                )}
                                <div className={vehicle.images?.[0] ? "ml-4" : ""}>
                                  <div className="text-sm font-medium text-gray-900">
                                    {vehicle.make} {vehicle.model}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {vehicle.trim}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {vehicle.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {vehicle.mileage?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatPrice(vehicle.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                vehicle.status === 'available' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {vehicle.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button 
                                className="text-trex-green hover:text-green-800"
                                onClick={() => setEditingVehicle(vehicle)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
          </DialogHeader>
          <AdminVehicleForm 
            onSuccess={() => setShowAddModal(false)}
            onCancel={() => setShowAddModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Modal */}
      <Dialog open={!!editingVehicle} onOpenChange={() => setEditingVehicle(null)}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          <AdminVehicleForm 
            vehicle={editingVehicle}
            onSuccess={() => setEditingVehicle(null)}
            onCancel={() => setEditingVehicle(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
