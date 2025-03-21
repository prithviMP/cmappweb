import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { EyeIcon, DownloadIcon } from 'lucide-react';

interface ContractorDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contractor: {
    name: string;
    type: string;
    email: string;
    avatar?: string;
  };
}

export const ContractorDetailDrawer = ({
  isOpen,
  onClose,
  contractor
}: ContractorDetailDrawerProps) => {
  const documents = [
    { name: 'Document_name.png', size: '2.33 MB' },
    { name: 'Document_name.jpg', size: '2.33 MB' },
  ];

  const projects = [
    { name: 'Project Name', status: 'In Progress', date: '31 Jan 2025' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] p-0 border-l transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <SheetHeader className="flex items-center justify-between mb-6">
              <SheetTitle className="text-xl font-medium">Contractor detail</SheetTitle>
              <Button variant="ghost" size="icon">
                <span className="sr-only">More options</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </SheetHeader>

            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={contractor.avatar} alt={contractor.name} />
                <AvatarFallback>{contractor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Contractor Name:</div>
                  <div className="font-medium">{contractor.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contractor type:</div>
                  <div className="font-medium">{contractor.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">E-mail:</div>
                  <div className="font-medium">{contractor.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium mb-4">Documents:</h3>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 2V9H20" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-medium mb-4">Projects:</h3>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{project.name}</div>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">More options</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-1 bg-[#e65f2b2e] text-[#e65f2b] text-sm rounded-full">
                        {project.status}
                      </div>
                      <div className="text-sm text-gray-500">{project.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};