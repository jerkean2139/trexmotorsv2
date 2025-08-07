import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  filters: {
    make: string;
    model: string;
    yearMin: string;
    yearMax: string;
    priceMin: string;
    priceMax: string;
    searchQuery: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    // Convert "all" back to empty string for backend filtering
    const filterValue = value === "all" ? "" : value;
    onFilterChange({ [key]: filterValue });
  };

  const applyFilters = () => {
    // Trigger a manual refresh by updating all filters at once
    onFilterChange({ ...filters });
  };

  const clearFilters = () => {
    onFilterChange({
      make: "",
      model: "",
      yearMin: "",
      yearMax: "",
      priceMin: "",
      priceMax: "",
      searchQuery: "",
      sortBy: "price-asc",
    });
  };

  return (
    <section className="bg-white py-8 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Vehicle</h2>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by make, model, year..."
                className="pl-12 focus:ring-trex-green focus:border-trex-green"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Make</Label>
              <Select value={filters.make || "all"} onValueChange={(value) => handleFilterChange('make', value)}>
                <SelectTrigger className="focus:ring-trex-green focus:border-trex-green">
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  <SelectItem value="Ford">Ford</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                  <SelectItem value="Honda">Honda</SelectItem>
                  <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                  <SelectItem value="Audi">Audi</SelectItem>
                  <SelectItem value="Lexus">Lexus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Year Range</Label>
              <Select value={filters.yearMin || "all"} onValueChange={(value) => handleFilterChange('yearMin', value)}>
                <SelectTrigger className="focus:ring-trex-green focus:border-trex-green">
                  <SelectValue placeholder="Min Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2020">2020+</SelectItem>
                  <SelectItem value="2015">2015+</SelectItem>
                  <SelectItem value="2010">2010+</SelectItem>
                  <SelectItem value="2005">2005+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Max Year</Label>
              <Select value={filters.yearMax || "all"} onValueChange={(value) => handleFilterChange('yearMax', value)}>
                <SelectTrigger className="focus:ring-trex-green focus:border-trex-green">
                  <SelectValue placeholder="Max Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Min Price</Label>
              <Select value={filters.priceMin || "all"} onValueChange={(value) => handleFilterChange('priceMin', value)}>
                <SelectTrigger className="focus:ring-trex-green focus:border-trex-green">
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">No Min</SelectItem>
                  <SelectItem value="10000">$10,000</SelectItem>
                  <SelectItem value="15000">$15,000</SelectItem>
                  <SelectItem value="20000">$20,000</SelectItem>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="30000">$30,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Max Price</Label>
              <Select value={filters.priceMax || "all"} onValueChange={(value) => handleFilterChange('priceMax', value)}>
                <SelectTrigger className="focus:ring-trex-green focus:border-trex-green">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">No Max</SelectItem>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="35000">$35,000</SelectItem>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="75000">$75,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button 
                onClick={applyFilters}
                className="bg-trex-green hover:bg-trex-green text-white flex-1"
              >
                <i className="fas fa-filter mr-2"></i>Apply
              </Button>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="border-trex-green text-trex-green hover:bg-trex-green hover:text-white"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
