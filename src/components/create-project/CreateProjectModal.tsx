import React, { useState } from "react";
import { Modal } from "../ui/modal/Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea/Textarea";
import { CalendarIcon, ChevronDownIcon, ImageIcon, PlusIcon, XIcon } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between border-b border-[#E4E4E7] p-6">
        <h2 className="text-xl font-medium">New Project</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-9 px-4 py-2 text-sm border-[#E4E4E7] text-[#71717A]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="h-9 px-4 py-2 text-sm bg-[#577bff] hover:bg-[#4a69d9] text-white">
            Create Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Project Details Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-6">Project detail</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Project Name</label>
                <Input
                  placeholder="Enter project name"
                  className="h-11 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Project Description</label>
                <Textarea
                  placeholder="Ex: Riverside Tower is a 10-story commercial building project focusing on sustainable design and energy-efficient technology. The project will include retail spaces on the ground floor and offices on upper levels, with planned completion within a 12-month timeframe"
                  className="h-32 rounded-lg resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Project Type</label>
                <Input
                  placeholder='Example: "Commercial"'
                  className="h-11 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Project Location</label>
                <Input
                  placeholder="Ex: 1234 Riverside Avenue, Springfield"
                  className="h-11 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Start Date</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="h-11 rounded-lg pl-4 pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Estimated End Date</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="h-11 rounded-lg pl-4 pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Project Manager</label>
                <div className="relative">
                  <Input
                    placeholder="Ex: John Smith"
                    className="h-11 rounded-lg pl-4 pr-10"
                  />
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Project Status</h3>
            <div className="relative">
              <Input
                placeholder="Select status"
                className="h-11 rounded-lg pl-4 pr-10"
              />
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Assign Contractors</h3>
              <Button
                className="h-9 px-3 py-2 text-sm bg-[#577bff] hover:bg-[#4a69d9] text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Contractor
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Contractor Type</label>
                <div className="relative">
                  <Input
                    placeholder="Dirtwork Contractor"
                    className="h-11 rounded-lg pl-4 pr-10"
                  />
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Contractor</label>
                <div className="relative">
                  <Input
                    placeholder="ACME Dirtworks, Smith Plumbing Inc."
                    className="h-11 rounded-lg pl-4 pr-10"
                  />
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Files attachments</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Files</p>
              <Button
                variant="outline"
                className="h-9 px-4 py-2 text-sm border-[#577bff] text-[#577bff]"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Add File
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Thumbnail</h3>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onClick={() => document.getElementById('thumbnail-upload')?.click()}
            >
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & Drop images here, or click
                </p>
                <p className="text-sm text-gray-600">
                  add images
                </p>
              </div>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </div>
            <Button
              variant="outline"
              className="h-9 px-4 py-2 mt-4 text-sm border-[#577bff] text-[#577bff]"
              onClick={() => document.getElementById('thumbnail-upload')?.click()}
            >
              Add File
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};