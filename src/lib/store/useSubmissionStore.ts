import { create } from 'zustand';
import { getSubmissions } from '../api/services/submissionService';

interface SubmissionResponse {
  data: {
    data: Array<{
      id: number;
      attributes: {
        comment: string;
        status: 'pending' | 'approved' | 'rejected';
        createdAt: string;
        task: {
          data: {
            attributes: {
              standard_task: {
                data: {
                  attributes: {
                    Name: string;
                    Description: string;
                  };
                };
              };
              project: {
                data: {
                  attributes: {
                    name: string;
                  };
                };
              };
            };
          } | null;
        };
        proofOfWork: {
          data: Array<{
            attributes: {
              name: string;
              size: number;
              url: string;
              formats?: {
                thumbnail?: { url: string };
                small?: { url: string };
                medium?: { url: string };
                large?: { url: string };
              };
            };
          }>;
        };
        submitted_by: {
          data: {
            attributes: {
              username: string;
            };
          };
        };
      };
    }>;
  };
}

interface SubmissionState {
  submissions: SubmissionResponse['data']['data'];
  loading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
}

const useSubmissionStore = create<SubmissionState>((set) => ({
  submissions: [],
  loading: false,
  error: null,
  fetchSubmissions: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching submissions...');
      const response = await getSubmissions();
      console.log('Submissions API response:', response);
      
      if (response?.data) {
        console.log('Setting submissions:', response.data);
        set({ submissions: response.data, loading: false });
      } else {
        console.log('No submissions data found in response');
        set({ submissions: [], loading: false });
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      set({ 
        submissions: [],
        error: 'Failed to fetch submissions', 
        loading: false 
      });
    }
  }
}));

export default useSubmissionStore;