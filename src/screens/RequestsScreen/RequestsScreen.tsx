import React, { useState, useEffect } from "react";
import { Search } from "../../components/ui/search/Search";
import { RequestCard } from "../../components/ui/request-card/RequestCard";
import { RequestDetailDrawer } from "../../components/request-detail/RequestDetailDrawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import useSubmissionStore from "../../lib/store/useSubmissionStore";
import useRegistrationStore from "../../lib/store/useRegistrationStore";
import { MEDIA_BASE_URL } from "../../lib/apiClient";

export const RequestsScreen = () => {
  const [selectedRequest, setSelectedRequest] = useState<{
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
  } | null>(null);

  const [submissionStatus, setSubmissionStatus] = useState("all");
  const [registrationStatus, setRegistrationStatus] = useState("all");
  const [submissionSearch, setSubmissionSearch] = useState("");
  const [registrationSearch, setRegistrationSearch] = useState("");

  const { submissions, loading: submissionsLoading, error: submissionsError, fetchSubmissions } = useSubmissionStore();
  const { registrations, loading: registrationsLoading, error: registrationsError, fetchRegistrations } = useRegistrationStore();

  useEffect(() => {
    fetchSubmissions();
    fetchRegistrations();
  }, [fetchSubmissions, fetchRegistrations]);

  const formatSubmissionRequest = (submission: any) => {
    const taskData = submission.attributes.task?.data;
    const standardTask = taskData?.attributes?.standard_task?.data?.attributes;
    const projectName = taskData?.attributes?.project?.data?.attributes?.name;
    const submittedBy = submission.attributes.submitted_by?.data?.attributes;
    const proofOfWork = submission.attributes.proofOfWork?.data || [];

    return {
      id: submission.id,
      contractorName: submittedBy?.username || "Unknown",
      taskName: standardTask?.Name || "Unknown Task",
      projectName: projectName || "Unknown Project",
      status: submission.attributes.status,
      submittedDate: new Date(submission.attributes.createdAt).toLocaleDateString(),
      comments: submission.attributes.comment,
      documents: proofOfWork.map((doc: any) => ({
        name: doc.attributes.name,
        size: `${Math.round(doc.attributes.size)} KB`,
        url: doc.attributes.url,
        formats: doc.attributes.formats
      }))
    };
  };

  const formatRegistrationRequest = (registration: any) => {
    const documents = registration.attributes.documents?.data || [];
    const subContractorName = registration.attributes.sub_contractor?.data?.attributes?.name;
    
    return {
      id: registration.id,
      contractorName: registration.attributes.username || "Unknown",
      taskName: `New registration from ${registration.attributes.username || "Unknown"}${subContractorName ? ` for ${subContractorName}` : ''}`,
      projectName: "Registration Request",
      status: registration.attributes.status,
      submittedDate: new Date(registration.attributes.createdAt).toLocaleDateString(),
      documents: documents.map((doc: any) => ({
        name: doc.attributes.name,
        size: `${Math.round(doc.attributes.size)} KB`,
        url: doc.attributes.url,
        formats: doc.attributes.formats
      }))
    };
  };

  const handleRequestClick = (request: typeof selectedRequest) => {
    setSelectedRequest(request);
  };

  const filterRequests = (requests: any[], status: string, searchTerm: string) => {
    return requests.filter(request => {
      const matchesStatus = status === "all" || request.status === status;
      const matchesSearch = searchTerm === "" || 
        request.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const submissionRequests = submissions.map(submission => {
    const formattedRequest = formatSubmissionRequest(submission);
    return {
      ...formattedRequest,
      onClick: () => handleRequestClick({
        contractorName: formattedRequest.contractorName,
        taskName: formattedRequest.taskName,
        projectName: formattedRequest.projectName,
        comments: formattedRequest.comments,
        documents: formattedRequest.documents
      })
    };
  });

  const registrationRequests = registrations.map(registration => {
    const formattedRequest = formatRegistrationRequest(registration);
    return {
      ...formattedRequest,
      onClick: () => handleRequestClick({
        contractorName: formattedRequest.contractorName,
        taskName: formattedRequest.taskName,
        projectName: formattedRequest.projectName,
        documents: formattedRequest.documents
      })
    };
  });

  const filteredSubmissionRequests = filterRequests(submissionRequests, submissionStatus, submissionSearch);
  const filteredRegistrationRequests = filterRequests(registrationRequests, registrationStatus, registrationSearch);

  if (submissionsLoading || registrationsLoading) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading requests...</div>
          </div>
        </div>
      </div>
    );
  }

  if (submissionsError || registrationsError) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              Error loading requests: {submissionsError || registrationsError}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px] mb-8">
          Requests
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions Section */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Submissions</h2>
              <div className="flex items-center gap-4">
                <Search
                  containerClassName="w-[200px]"
                  placeholder="Search Request"
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                />
                <Select value={submissionStatus} onValueChange={setSubmissionStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              {filteredSubmissionRequests.map((request) => (
                <div key={request.id} onClick={request.onClick}>
                  <RequestCard {...request} />
                </div>
              ))}
              {filteredSubmissionRequests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No submission requests found
                </div>
              )}
            </div>
          </div>

          {/* Registration Section */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Registration</h2>
              <div className="flex items-center gap-4">
                <Search
                  containerClassName="w-[200px]"
                  placeholder="Search Request"
                  value={registrationSearch}
                  onChange={(e) => setRegistrationSearch(e.target.value)}
                />
                <Select value={registrationStatus} onValueChange={setRegistrationStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              {filteredRegistrationRequests.map((request) => (
                <div key={request.id} onClick={request.onClick}>
                  <RequestCard {...request} />
                </div>
              ))}
              {filteredRegistrationRequests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No registration requests found
                </div>
              )}
            </div>
          </div>
        </div>

        <RequestDetailDrawer
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest || { contractorName: '', taskName: '', projectName: '' }}
        />
      </div>
    </div>
  );
};