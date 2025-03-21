import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../input";
import { cn } from "../../../lib/utils";

interface SearchProps {
  placeholder?: string;
  containerClassName?: string;
}

export const Search = ({ placeholder = "Search...", containerClassName }: SearchProps) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#98A2B3]" />
      <Input
        placeholder={placeholder}
        className="pl-10 h-[42px] rounded-[8px] border-[#E4E4E7] text-[#98A2B3] placeholder:text-[#98A2B3]"
      />
    </div>
  );
};