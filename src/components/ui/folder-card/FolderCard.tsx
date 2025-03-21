import React from "react";
import { Card } from "../card";
import { Checkbox } from "../checkbox";
import { MoreVertical, Folder } from "lucide-react";

interface FolderCardProps {
  name: string;
  filesCount: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export const FolderCard = ({ name, filesCount, selected = false, onSelect }: FolderCardProps) => {
  return (
    <Card className="flex items-center p-3 bg-white hover:bg-gray-50 transition-colors">
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="mr-3"
      />
      <Folder className="w-8 h-8 text-[#FFB057]" />
      <div className="ml-3 flex-1">
        <p className="text-sm text-[#060606] font-medium">{name}</p>
        <p className="text-xs text-[#71717A]">{filesCount}</p>
      </div>
      <button className="p-1 hover:bg-gray-100 rounded">
        <MoreVertical className="w-4 h-4 text-[#71717A]" />
      </button>
    </Card>
  );
};