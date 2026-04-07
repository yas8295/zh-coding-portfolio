import { useQuery, useMutation } from "react-query";

export interface Job {
  id: number;
  title: string;
  description: string;
  location: "remote" | "site";
  salary: string;
  type: "full-time" | "part-time" | "contract";
  user_id: number;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

export interface JobsResponse {
  current_page: number;
  data: Job[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const useJobs = (page: number = 1) => {
  const query = useQuery(
    ["jobs", page],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/jobs?page=${page}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      return response.json() as Promise<JobsResponse>;
    },
    {
      keepPreviousData: true,
    },
  );

  return {
    jobs: query.data?.data || [],
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    pagination: query.data
      ? {
          current_page: query.data.current_page,
          first_page_url: query.data.first_page_url,
          from: query.data.from,
          last_page: query.data.last_page,
          last_page_url: query.data.last_page_url,
          links: query.data.links,
          next_page_url: query.data.next_page_url,
          path: query.data.path,
          per_page: query.data.per_page,
          prev_page_url: query.data.prev_page_url,
          to: query.data.to,
          total: query.data.total,
        }
      : null,
    refetch: query.refetch,
  };
};

export const useApplyForJob = () => {
  return useMutation(
    async ({ jobId, formData }: { jobId: number; formData: FormData }) => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/jobs/${jobId}/apply`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      return response.json();
    },
  );
};
