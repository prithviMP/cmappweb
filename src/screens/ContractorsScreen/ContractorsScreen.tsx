import React, { useState, useEffect } from "react";
import { Search } from "../../components/ui/search/Search";
import { StatsBadge } from "../../components/ui/stats-badge/StatsBadge";
import { ContractorCard } from "../../components/ui/contractor-card/ContractorCard";
import { ContractorDetailDrawer } from "../../components/contractor-detail/ContractorDetailDrawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import useContractorStore from "../../lib/store/useContractorStore";
import { Button } from "../../components/ui/button";

export const ContractorsScreen = () => {
  const [selectedContractor, setSelectedContractor] = useState<{
    name: string;
    type: string;
    email: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const { contractors, loading, error, fetchContractors } = useContractorStore();

  useEffect(() => {
    fetchContractors();
  }, [fetchContractors]);

  const handleContractorClick = (contractor: any) => {
    setSelectedContractor({
      name: contractor.attributes.username,
      type: contractor.attributes.sub_contractor?.data?.attributes?.name || 'N/A',
      email: contractor.attributes.email
    });
  };

  // Get unique contractor types
  const contractorTypes = Array.from(new Set(
    contractors.map(contractor => 
      contractor.attributes.sub_contractor?.data?.attributes?.name || 'Other'
    )
  ));

  // Filter contractors based on search and type
  const filteredContractors = contractors.filter(contractor => {
    const searchLower = searchQuery.toLowerCase();
    const contractorName = contractor.attributes.username.toLowerCase();
    const contractorType = contractor.attributes.sub_contractor?.data?.attributes?.name?.toLowerCase() || 'other';
    const contractorEmail = contractor.attributes.email.toLowerCase();
    
    const matchesSearch = searchQuery === "" || 
      contractorName.includes(searchLower) ||
      contractorType.includes(searchLower) ||
      contractorEmail.includes(searchLower);

    const matchesType = selectedType === "all" || 
      (contractor.attributes.sub_contractor?.data?.attributes?.name || 'Other') === selectedType;

    return matchesSearch && matchesType;
  });

  // Group filtered contractors by type
  const groupedContractors = filteredContractors.reduce((acc, contractor) => {
    const type = contractor.attributes.sub_contractor?.data?.attributes?.name || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(contractor);
    return acc;
  }, {} as Record<string, typeof contractors>);

  // Calculate stats
  const totalContractors = contractors.length;
  const activeContractors = contractors.length; // Since we don't have a status field, assuming all are active
  const inactiveContractors = 0; // Since we don't have a status field

  if (loading) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading contractors...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading contractors: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px] mb-8">
          Contractors
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsBadge
            count={totalContractors}
            label="Total Contractors"
            color="bg-[#577bff]"
          />
          <StatsBadge
            count={activeContractors}
            label="Active Contractors"
            color="bg-[#1a922d]"
          />
          <StatsBadge
            count={inactiveContractors}
            label="In-Active Contractors"
            color="bg-[#ff7b7b]"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {contractorTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-4">
            <Search
              containerClassName="w-[300px]"
              placeholder="Search by name, type or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedContractors).map(([type, contractors]) => (
            <div key={type}>
              <h2 className="text-lg font-medium mb-4">{`${type} Contractors`}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contractors.map((contractor) => (
                  <div
                    key={contractor.id}
                    onClick={() => handleContractorClick(contractor)}
                    className="cursor-pointer"
                  >
                    <ContractorCard
                      id={contractor.id}
                      attributes={contractor.attributes}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedContractors).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchQuery || selectedType !== "all" 
                ? "No contractors found matching the filters"
                : "No contractors found"}
            </div>
          )}
        </div>

        <ContractorDetailDrawer
          isOpen={!!selectedContractor}
          onClose={() => setSelectedContractor(null)}
          contractor={selectedContractor || { name: '', type: '', email: '' }}
        />
      </div>
    </div>
  );
};