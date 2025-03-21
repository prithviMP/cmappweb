import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search } from "../../components/ui/search/Search";
import { FolderCard } from "../../components/ui/folder-card/FolderCard";
import { FileCard } from "../../components/ui/file-card/FileCard";
import { PlusIcon, SearchIcon, ChevronLeftIcon } from "lucide-react";
import { Breadcrumb } from "../../components/ui/breadcrumb/Breadcrumb";

interface FolderType {
  id: string;
  name: string;
  filesCount: string;
  files?: FileType[];
  folders?: FolderType[];
}

interface FileType {
  type: "doc" | "pdf" | "png" | "jpg" | "xlsx";
  name: string;
  size: string;
}

const initialFolders: FolderType[] = [
  { 
    id: "folder1",
    name: "Folder Name", 
    filesCount: "10 files",
    files: [
      { type: "doc", name: "Initial meet MOM.doc", size: "350kb" },
      { type: "pdf", name: "New Requirements.pdf", size: "350kb" },
      { type: "png", name: "Design mockup.png", size: "350kb" },
    ],
    folders: [
      {
        id: "subfolder1",
        name: "Subfolder 1",
        filesCount: "5 files",
        files: [
          { type: "doc", name: "Document 1.doc", size: "250kb" },
          { type: "pdf", name: "Document 2.pdf", size: "150kb" },
        ]
      }
    ]
  },
  { 
    id: "folder2",
    name: "Empty Folder", 
    filesCount: "0 files",
    files: [],
    folders: []
  },
  { 
    id: "folder3",
    name: "Project Documents", 
    filesCount: "8 files",
    files: [
      { type: "xlsx", name: "Project Timeline.xlsx", size: "250kb" },
      { type: "pdf", name: "Requirements.pdf", size: "450kb" },
    ]
  },
];

const files: FileType[] = [
  { type: "doc", name: "Initial meet MOM.doc", size: "350kb" },
  { type: "pdf", name: "New Requirements.pdf", size: "350kb" },
  { type: "pdf", name: "Floor Designs.pdf", size: "350kb" },
  { type: "doc", name: "Initial meet MOM.doc", size: "350kb" },
  { type: "png", name: "New Requirements.png", size: "350kb" },
  { type: "jpg", name: "Floor Designs.jpg", size: "350kb" },
  { type: "xlsx", name: "Filename.xlsx", size: "350kb" },
  { type: "pdf", name: "New Requirements.pdf", size: "350kb" },
  { type: "png", name: "New Requirements.png", size: "350kb" },
  { type: "png", name: "New Requirements.png", size: "350kb" },
  { type: "xlsx", name: "Filename.xlsx", size: "350kb" },
  { type: "pdf", name: "Floor Designs.pdf", size: "350kb" },
];

export const ResourcesScreen = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const [folderHistory, setFolderHistory] = useState<FolderType[]>([]);

  const handleFolderClick = (folder: FolderType) => {
    setFolderHistory(prev => [...prev, folder]);
    setCurrentFolder(folder);
  };

  const handleBackClick = () => {
    if (folderHistory.length > 1) {
      const newHistory = [...folderHistory];
      newHistory.pop();
      setFolderHistory(newHistory);
      setCurrentFolder(newHistory[newHistory.length - 1]);
    } else {
      setFolderHistory([]);
      setCurrentFolder(null);
    }
  };

  const navigateToFolder = (index: number) => {
    if (index === -1) {
      // Navigate to root
      setFolderHistory([]);
      setCurrentFolder(null);
    } else {
      // Navigate to specific folder in history
      const newHistory = folderHistory.slice(0, index + 1);
      setFolderHistory(newHistory);
      setCurrentFolder(newHistory[newHistory.length - 1]);
    }
  };

  const getBreadcrumbItems = () => {
    return [
      { 
        label: "Resources", 
        onClick: () => navigateToFolder(-1)
      },
      ...folderHistory.map((folder, index) => ({
        label: folder.name,
        onClick: () => navigateToFolder(index)
      }))
    ];
  };

  const renderFolderContent = () => {
    if (!currentFolder) {
      return (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialFolders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className="cursor-pointer"
                >
                  <FolderCard
                    {...folder}
                    selected={selectedItems.has(`folder-${folder.id}`)}
                    onSelect={(selected) => {
                      const newSelected = new Set(selectedItems);
                      if (selected) {
                        newSelected.add(`folder-${folder.id}`);
                      } else {
                        newSelected.delete(`folder-${folder.id}`);
                      }
                      setSelectedItems(newSelected);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <FileCard
                  key={index}
                  {...file}
                  selected={selectedItems.has(`file-${index}`)}
                  onSelect={(selected) => {
                    const newSelected = new Set(selectedItems);
                    if (selected) {
                      newSelected.add(`file-${index}`);
                    } else {
                      newSelected.delete(`file-${index}`);
                    }
                    setSelectedItems(newSelected);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-8">
        {currentFolder.folders && currentFolder.folders.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFolder.folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className="cursor-pointer"
                >
                  <FolderCard
                    {...folder}
                    selected={selectedItems.has(`folder-${folder.id}`)}
                    onSelect={(selected) => {
                      const newSelected = new Set(selectedItems);
                      if (selected) {
                        newSelected.add(`folder-${folder.id}`);
                      } else {
                        newSelected.delete(`folder-${folder.id}`);
                      }
                      setSelectedItems(newSelected);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentFolder.files && currentFolder.files.length > 0 ? (
          <div>
            <h2 className="text-lg font-medium mb-4">Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFolder.files.map((file, index) => (
                <FileCard
                  key={index}
                  {...file}
                  selected={selectedItems.has(`file-${currentFolder.id}-${index}`)}
                  onSelect={(selected) => {
                    const newSelected = new Set(selectedItems);
                    if (selected) {
                      newSelected.add(`file-${currentFolder.id}-${index}`);
                    } else {
                      newSelected.delete(`file-${currentFolder.id}-${index}`);
                    }
                    setSelectedItems(newSelected);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4">
              <img
                src="/icons-6.svg"
                alt="Empty folder"
                className="w-16 h-16 mx-auto opacity-50"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">This folder is empty</h3>
            <p className="text-gray-500 mb-4">Add files or folders to get started</p>
            <Button
              className="h-[42px] px-4 py-2 bg-[#577bff] hover:bg-[#4a69d9] text-white rounded-[8px]"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Files
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px]">
              Resources
            </h1>
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-[42px] px-4 py-2 border border-[#E4E4E7] rounded-[8px] text-[#060606] bg-white"
            >
              Create Folder
            </Button>
            <Button
              className="h-[42px] px-4 py-2 bg-[#577bff] hover:bg-[#4a69d9] text-white rounded-[8px]"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Files
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Search
            containerClassName="w-full max-w-[400px]"
            placeholder="Search files"
          />
        </div>

        {renderFolderContent()}
      </div>
    </div>
  );
};