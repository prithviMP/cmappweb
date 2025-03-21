import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Share2Icon, DownloadIcon, TrashIcon, MoreHorizontalIcon, PlusIcon, UserIcon, SearchIcon, CheckCircleIcon, AlertCircleIcon, FilterIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Breadcrumb } from "../../components/ui/breadcrumb/Breadcrumb";
import useProjectStore from "../../lib/store/useProjectStore";
import { BASE_URL, MEDIA_BASE_URL } from "../../lib/apiClient";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { TaskDetailDrawer } from "../../components/task-detail/TaskDetailDrawer";

export const ProjectDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProject, loading, error, fetchProjectById } = useProjectStore();
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("all");
  const [selectedContractor, setSelectedContractor] = useState<string>("all");
  const [selectedApprover, setSelectedApprover] = useState<string>("all");

  useEffect(() => {
    if (id) {
      fetchProjectById(id);
    }
  }, [id, fetchProjectById]);

  if (loading) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading project details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading project: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Project not found</div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#F2F4F7] text-[#344054]';
      case 'ongoing':
        return 'bg-[#FEF0C7] text-[#B54708]';
      case 'completed':
        return 'bg-[#D1FADF] text-[#027A48]';
      default:
        return 'bg-[#F2F4F7] text-[#344054]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Not Started';
      case 'ongoing':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Not Started';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const projectThumbnail = selectedProject.attributes.documents?.data?.[0]
    ? `${MEDIA_BASE_URL}${selectedProject.attributes.documents.data[0].attributes.formats.small.url}`
    : "/project-thumbnail.jpg";

  // Get all tasks
  const tasks = selectedProject.attributes.tasks?.data || [];

  // Extract unique team members, contractors, and approvers
  const uniqueTeamMembers = Array.from(new Set(tasks
    .map(task => task.attributes.project_team_member?.data?.attributes?.username)
    .filter(Boolean)));

  const uniqueContractors = Array.from(new Set(tasks
    .flatMap(task => task.attributes.contractor?.data?.map(c => c.attributes.username))
    .filter(Boolean)));

  const uniqueApprovers = Array.from(new Set(tasks
    .flatMap(task => task.attributes.approver?.data?.map(a => a.attributes.username))
    .filter(Boolean)));

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const taskName = task.attributes.standard_task.data.attributes.Name.toLowerCase();
    const taskDescription = task.attributes.standard_task.data.attributes.Description.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = searchQuery === "" || 
      taskName.includes(searchLower) || 
      taskDescription.includes(searchLower);

    const matchesStatus = selectedStatus === "all" || 
      task.attributes.task_status === selectedStatus;

    const matchesTeamMember = selectedTeamMember === "all" || 
      task.attributes.project_team_member?.data?.attributes?.username === selectedTeamMember;

    const matchesContractor = selectedContractor === "all" || 
      task.attributes.contractor?.data?.some(c => c.attributes.username === selectedContractor);

    const matchesApprover = selectedApprover === "all" || 
      task.attributes.approver?.data?.some(a => a.attributes.username === selectedApprover);

    return matchesSearch && matchesStatus && matchesTeamMember && 
           matchesContractor && matchesApprover;
  });

  // Calculate project progress based on completed tasks
  const completedTasks = tasks.filter(task => task.attributes.task_status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Group filtered tasks by status
  const tasksByStatus = {
    'To Do': filteredTasks.filter(task => task.attributes.task_status === 'pending'),
    'In Progress': filteredTasks.filter(task => task.attributes.task_status === 'ongoing'),
    'Completed': filteredTasks.filter(task => task.attributes.task_status === 'completed')
  };

  const TaskCard = ({ task }: { task: any }) => {
    const projectTeamMember = task.attributes.project_team_member?.data?.attributes;
    const contractor = task.attributes.contractor?.data?.[0]?.attributes;
    const approver = task.attributes.approver?.data?.[0]?.attributes;
    const submissions = task.attributes.submissions?.data || [];
    const standardTask = task.attributes.standard_task?.data?.attributes;
    const latestSubmission = submissions[submissions.length - 1]?.attributes;

    return (
      <div 
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer"
        onClick={() => setSelectedTask({
          name: standardTask?.Name || 'Untitled Task',
          description: standardTask?.Description || '',
          status: task.attributes.task_status,
          dueDate: task.attributes.due_date ? formatDate(task.attributes.due_date) : undefined,
          projectTeamMember: projectTeamMember ? {
            username: projectTeamMember.username
          } : undefined,
          contractor: contractor ? {
            username: contractor.username
          } : undefined,
          approver: approver ? {
            username: approver.username
          } : undefined,
          submissions: submissions.map((submission: any) => ({
            status: submission.attributes.status,
            submittedAt: formatDate(submission.attributes.createdAt),
            comment: submission.attributes.comment,
            rejection_reason: submission.attributes.rejection_reason,
            proofOfWork: {
              data: submission.attributes.proofOfWork?.data?.map((doc: any) => ({
                attributes: {
                  name: doc.attributes.name,
                  size: doc.attributes.size,
                  url: doc.attributes.url,
                  mime: doc.attributes.mime,
                  formats: doc.attributes.formats
                }
              }))
            }
          }))
        })}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium">{standardTask?.Name || 'Untitled Task'}</div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {standardTask?.Description || ''}
        </p>

        <div className="space-y-3 mb-4">
          {projectTeamMember && (
            <div className="flex items-center gap-2 text-sm">
              <div className="text-gray-500 w-24">Assigned to:</div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {projectTeamMember.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{projectTeamMember.username}</span>
              </div>
            </div>
          )}

          {contractor && (
            <div className="flex items-center gap-2 text-sm">
              <div className="text-gray-500 w-24">Contractor:</div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-green-100 text-green-600">
                    {contractor.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{contractor.username}</span>
              </div>
            </div>
          )}

          {approver && (
            <div className="flex items-center gap-2 text-sm">
              <div className="text-gray-500 w-24">Approver:</div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {approver.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{approver.username}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {latestSubmission && (
              <div className={`flex items-center gap-1 text-xs ${
                latestSubmission.status === 'approved' ? 'text-green-600' :
                latestSubmission.status === 'rejected' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {latestSubmission.status === 'approved' ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : latestSubmission.status === 'rejected' ? (
                  <AlertCircleIcon className="w-4 h-4" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                )}
                <span className="capitalize">{latestSubmission.status}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {task.attributes.due_date ? formatDate(task.attributes.due_date) : 'No due date'}
          </div>
        </div>
      </div>
    );
  };

  const TaskFilters = () => (
    <div className="bg-white rounded-xl p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Not Started</SelectItem>
            <SelectItem value="ongoing">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by team member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Team Members</SelectItem>
            {uniqueTeamMembers.map(member => (
              <SelectItem key={member} value={member}>{member}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedContractor} onValueChange={setSelectedContractor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by contractor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contractors</SelectItem>
            {uniqueContractors.map(contractor => (
              <SelectItem key={contractor} value={contractor}>{contractor}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedApprover} onValueChange={setSelectedApprover}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by approver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Approvers</SelectItem>
            {uniqueApprovers.map(approver => (
              <SelectItem key={approver} value={approver}>{approver}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("all");
            setSelectedTeamMember("all");
            setSelectedContractor("all");
            setSelectedApprover("all");
          }}
          className="px-4 py-2"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <div className="mb-4">
          <Breadcrumb
            items={[
              { 
                label: "Projects", 
                onClick: () => navigate("/projects")
              },
              { 
                label: selectedProject.attributes.name
              }
            ]}
          />
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px]">
            {selectedProject.attributes.name}
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-[42px] px-4 py-2 border border-[#577bff] text-[#577bff] rounded-[8px]"
            >
              Assign Task
            </Button>
            <Button className="h-[42px] px-4 py-2 bg-[#577bff] hover:bg-[#4a69d9] text-white rounded-[8px]">
              Edit Project
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex gap-6 mb-8">
            <div className="w-[300px] h-[200px] rounded-lg overflow-hidden">
              <img
                src={projectThumbnail}
                alt={selectedProject.attributes.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-medium">{selectedProject.attributes.name}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Share2Icon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Progress</div>
                <div className="flex items-center gap-4">
                  <Progress value={progress} className="flex-1" />
                  <span className="text-[#e65f2b] font-medium">{progress}%</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-8">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className={`px-3 py-1 rounded-full text-sm inline-block ${getStatusColor(selectedProject.attributes.project_status)}`}>
                    {getStatusLabel(selectedProject.attributes.project_status)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Project Type</div>
                  <div className="font-medium">{selectedProject.attributes.project_type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Due date</div>
                  <div className="font-medium">{formatDate(selectedProject.attributes.end_date)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Created on</div>
                  <div className="font-medium">{formatDate(selectedProject.attributes.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="border-b border-gray-200 mb-6">
              <TabsTrigger value="overview" className="pb-4 text-gray-500">Overview</TabsTrigger>
              <TabsTrigger value="task" className="pb-4 text-gray-500">Task</TabsTrigger>
              <TabsTrigger value="attachment" className="pb-4 text-gray-500">Attachment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">About Project</h3>
                    <p className="text-gray-600">
                      {selectedProject.attributes.description || "No description available"}
                    </p>
                  </div>

                  {selectedProject.attributes.documents?.data && (
                    <div className="bg-white rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Attachments</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProject.attributes.documents.data.map((doc, index) => (
                          <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <img src="/f7-doc-person.svg" alt="Doc" className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{doc.attributes.name}</div>
                              <div className="text-xs text-gray-500">{Math.round(doc.attributes.size)}kb</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <DownloadIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2Icon className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Project Activity</h3>
                    <div className="text-center py-8 text-gray-500">
                      No activity recorded yet
                    </div>
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-6">Project Location</h3>
                    <p className="text-gray-600">{selectedProject.attributes.location}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="task">
              <TaskFilters />
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                  <div key={status} className="bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'To Do' ? 'bg-[#577bff]' :
                          status === 'In Progress' ? 'bg-[#e65f2b]' :
                          'bg-[#1a922d]'
                        }`} />
                        <h3 className="font-medium">{status}</h3>
                      </div>
                      <span className="text-sm text-gray-500">{statusTasks.length}</span>
                    </div>
                    <div className="space-y-4">
                      {statusTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                      {statusTasks.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No tasks found
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="attachment">
              {selectedProject.attributes.documents?.data && selectedProject.attributes.documents.data.length > 0 ? (
                <div>
                  <div className="relative mb-8">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search files"
                      className="pl-12 h-12 w-[300px] rounded-lg border-gray-200"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.attributes.documents.data.map((doc, index) => (
                          <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <img src="/f7-doc-person.svg" alt="Doc" className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{doc.attributes.name}</div>
                              <div className="text-xs text-gray-500">{Math.round(doc.attributes.size)}kb</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <DownloadIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2Icon className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <DownloadIcon className="w-12 h-12 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No attachments yet</h3>
                  <p className="text-gray-500 mb-4">Add files to your project</p>
                  <Button className="bg-[#577bff] hover:bg-[#4a69d9] text-white">
                    Add Files
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {selectedTask && (
        <TaskDetailDrawer
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  );
};