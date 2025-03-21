import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { EyeIcon, DownloadIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { MEDIA_BASE_URL } from '../../lib/apiClient';
import { truncateFilename } from '../../lib/utils';

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    name: string;
    description: string;
    status: string;
    dueDate?: string;
    projectTeamMember?: {
      username: string;
    };
    contractor?: {
      username: string;
    };
    approver?: {
      username: string;
    };
    submissions?: {
      comment?: string;
      status: string;
      submittedAt: string;
      rejection_reason?: string | null;
      proofOfWork?: {
        data: Array<{
          attributes: {
            name: string;
            size: number;
            url: string;
            mime: string;
            formats: {
              thumbnail?: {
                url: string;
              };
              small?: {
                url: string;
              };
              medium?: {
                url: string;
              };
              large?: {
                url: string;
              };
            };
          };
        }>;
      };
    }[];
  };
}

export const TaskDetailDrawer = ({
  isOpen,
  onClose,
  task
}: TaskDetailDrawerProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <AlertCircleIcon className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-orange-600';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const getImageUrl = (doc: any) => {
    // Try to get the smallest available format
    const format = doc.attributes.formats?.thumbnail?.url || 
                  doc.attributes.formats?.small?.url ||
                  doc.attributes.formats?.medium?.url ||
                  doc.attributes.formats?.large?.url ||
                  doc.attributes.url;
    
    return `${MEDIA_BASE_URL}${format}`;
  };

  const getFullImageUrl = (doc: any) => {
    return `${MEDIA_BASE_URL}${doc.attributes.url}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] p-0 border-l transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <SheetHeader className="flex items-center justify-between mb-6">
              <SheetTitle className="text-xl font-medium">Task Details</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <span className="sr-only">Close</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </SheetHeader>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Task Name:</div>
                <div className="font-medium">{task.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Description:</div>
                <div className="text-sm text-gray-600 mt-1">{task.description}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status:</div>
                <div className="font-medium capitalize">{task.status}</div>
              </div>
              {task.dueDate && (
                <div>
                  <div className="text-sm text-gray-500">Due Date:</div>
                  <div className="font-medium">{task.dueDate}</div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {task.projectTeamMember && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 w-24">Assigned to:</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {task.projectTeamMember.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.projectTeamMember.username}</span>
                  </div>
                </div>
              )}

              {task.contractor && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 w-24">Contractor:</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {task.contractor.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.contractor.username}</span>
                  </div>
                </div>
              )}

              {task.approver && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 w-24">Approver:</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {task.approver.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.approver.username}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {task.submissions && task.submissions.length > 0 && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium mb-4">Submissions:</h3>
                <div className="space-y-4">
                  {task.submissions.map((submission, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-2 ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span className="text-sm font-medium capitalize">{submission.status}</span>
                        </div>
                        <div className="text-sm text-gray-500">{submission.submittedAt}</div>
                      </div>

                      {submission.comment && (
                        <div className="mb-4">
                          <div className="text-sm text-gray-500">Comment:</div>
                          <div className="text-sm mt-1">{submission.comment}</div>
                        </div>
                      )}

                      {submission.rejection_reason && (
                        <div className="mb-4">
                          <div className="text-sm text-red-500">Rejection Reason:</div>
                          <div className="text-sm mt-1">{submission.rejection_reason}</div>
                        </div>
                      )}

                      {submission.proofOfWork?.data && submission.proofOfWork.data.length > 0 && (
                        <div className="space-y-3">
                          <div className="text-sm text-gray-500 mb-2">Proof of Work:</div>
                          {submission.proofOfWork.data.map((doc, docIndex) => (
                            <div key={docIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                {doc.attributes.mime?.startsWith('image/') ? (
                                  <img 
                                    src={getImageUrl(doc)} 
                                    alt={doc.attributes.name}
                                    className="w-12 h-12 object-cover rounded-lg"
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
                                  <div className="text-sm font-medium" title={doc.attributes.name}>
                                    {truncateFilename(doc.attributes.name)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatFileSize(doc.attributes.size)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(getFullImageUrl(doc), '_blank')}
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(getFullImageUrl(doc), '_blank')}
                                >
                                  <DownloadIcon className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
                Reject Submission
              </Button>
              <Button 
                className="flex-1 h-11 bg-[#1A922D] hover:bg-[#158425] text-white"
              >
                Approve Submission
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};