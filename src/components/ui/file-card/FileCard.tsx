import React from "react";
import { Card } from "../card";
import { MoreVertical } from "lucide-react";
import { Checkbox } from "../checkbox";

interface FileCardProps {
  type: "doc" | "pdf" | "png" | "jpg" | "xlsx";
  name: string;
  size: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const FileTypeIcons = {
  doc: <div className="w-8 h-8 bg-[#577bff] rounded flex items-center justify-center text-white text-xs">DOC</div>,
  pdf: <div className="w-8 h-8 bg-[#FF4D4D] rounded flex items-center justify-center text-white text-xs">PDF</div>,
  png: <div className="w-8 h-8 bg-[#34D399] rounded flex items-center justify-center text-white text-xs">PNG</div>,
  jpg: <div className="w-8 h-8 bg-[#F97316] rounded flex items-center justify-center text-white text-xs">JPG</div>,
  xlsx: <div className="w-8 h-8 bg-[#22C55E] rounded flex items-center justify-center text-white text-xs">XLS</div>,
};

export const FileCard = ({ type, name, size, selected = false, onSelect }: FileCardProps) => {
  return (
    <Card className="flex items-center p-3 bg-white hover:bg-gray-50 transition-colors">
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="mr-3"
      />
      {FileTypeIcons[type]}
      <div className="ml-3 flex-1">
        <p className="text-sm text-[#060606] font-medium">{name}</p>
        <p className="text-xs text-[#71717A]">{size}</p>
      </div>
      <button className="p-1 hover:bg-gray-100 rounded">
        <MoreVertical className="w-4 h-4 text-[#71717A]" />
      </button>
    </Card>
  );
};