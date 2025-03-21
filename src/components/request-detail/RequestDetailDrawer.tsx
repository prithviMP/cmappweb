import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { EyeIcon, DownloadIcon } from 'lucide-react';
import { MEDIA_BASE_URL } from '../../lib/apiClient';
import { ImageViewer } from '../ui/image-viewer/ImageViewer';
import { truncateFilename } from '../../lib/utils';

interface RequestDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    contractorName: string;
    taskName: string;
    projectName: string;
    comments?: string;
    documents?: Array<{
      name: string;
      size: string;
      url: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    }>;
  };
}

export const RequestDetailDrawer = ({
  isOpen,
  onClose,
  request
}: RequestDetailDrawerProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const getImageUrl = (doc: any) => {
    const format = doc.formats?.thumbnail?.url || 
                  doc.formats?.small?.url ||
                  doc.formats?.medium?.url ||
                  doc.formats?.large?.url ||
                  doc.url;
    
    return `${MEDIA_BASE_URL}${format}`;
  };

  const getFullImageUrl = (doc: any) => {
    return `${MEDIA_BASE_URL}${doc.url}`;
  };

  const imageDocuments = request.documents?.filter(doc => 
    doc.url && doc.url.match(/\.(jpg|jpeg|png|gif)$/i)
  ) || [];

  const handleViewImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleDownload = (doc: any) => {
    const url = getFullImageUrl(doc);
    window.open(url, '_blank');
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="right" 
          className="w-[400px] sm:w-[540px] p-0 border-l transition-transform duration-300 ease-in-out"
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
              <SheetHeader className="flex items-center justify-between mb-6">
                <SheetTitle className="text-xl font-medium">Request detail</SheetTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <span className="sr-only">Close</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Contractor Name:</div>
                  <div className="font-medium">{request.contractorName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Task Name:</div>
                  <div className="font-medium">{request.taskName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Project Name:</div>
                  <div className="font-medium">{request.projectName}</div>
                </div>
                {request.comments && (
                  <div>
                    <div className="text-sm text-gray-500">Comments:</div>
                    <div className="text-sm text-gray-600 mt-1">{request.comments}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {request.documents && request.documents.length > 0 && (
                <div className="p-6">
                  <h3 className="font-medium mb-4">Documents:</h3>
                  <div className="space-y-3">
                    {request.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {doc.url && doc.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                            <img 
                              src={getImageUrl(doc)}
                              alt={doc.name}
                              className="w-12 h-12 object-cover rounded-lg cursor-pointer"
                              onClick={() => handleViewImage(imageDocuments.findIndex(d => d.url === doc.url))}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13 2V9H20" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium" title={doc.name}>
                              {truncateFilename(doc.name)}
                            </div>
                            <div className="text-xs text-gray-500">{doc.size}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.url && doc.url.match(/\.(jpg|jpeg|png|gif)$/i) && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewImage(imageDocuments.findIndex(d => d.url === doc.url))}
                            >
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDownload(doc)}
                          >
                            <DownloadIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 h-11 bg-white border-[#EE1F1B] text-[#EE1F1B] hover:bg-[#EE1F1B] hover:text-white"
                >
                  Reject Request
                </Button>
                <Button 
                  className="flex-1 h-11 bg-[#1A922D] hover:bg-[#158425] text-white"
                >
                  Approve Request
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ImageViewer
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={imageDocuments.map(doc => ({
          url: getFullImageUrl(doc),
          name: truncateFilename(doc.name, 30)
        }))}
        initialIndex={selectedImageIndex || 0}
      />
    </>
  );
};