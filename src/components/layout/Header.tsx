import React from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Input } from "../ui/input";

export const Header = (): JSX.Element => {
  return (
    <header className="flex w-full items-center py-4">
      <div className="flex items-center justify-between w-full">
        {/* Search Bar */}
        <div className="relative w-[487px]">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[22px] h-[22px] text-[#06060666]" />
          <Input
            className="pl-12 h-12 rounded-[55px] shadow-[0px_4px_6px_#00000005] font-['Work_Sans',Helvetica] text-sm text-[#06060666]"
            placeholder="Search for anything..."
          />
        </div>

        {/* User Profile and Notification */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="flex w-12 h-12 items-center justify-center bg-white rounded-[31px] shadow-[0px_4px_6px_#00000005]">
            <div className="relative">
              <BellIcon className="w-7 h-7 text-gray-700" />
              <div className="absolute w-2 h-2 top-0.5 right-0.5 bg-[#ffb057] rounded-[4.08px]" />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 px-5 py-[5px] bg-white rounded-3xl shadow-[0px_4px_6px_#00000005]">
            <Avatar className="w-[42px] h-[42px]">
              <AvatarImage src="/ellipse-3226.png" alt="Alex meian" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-['Work_Sans',Helvetica] font-normal text-[#292d32] text-sm">
                Alex meian
              </span>
              <span className="font-['Work_Sans',Helvetica] font-normal text-[#292d3270] text-xs">
                Project manager
              </span>
            </div>

            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-700" />
          </div>
        </div>
      </div>
    </header>
  );
};