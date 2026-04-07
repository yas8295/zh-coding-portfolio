import { useQuery } from "react-query";

export interface BlogUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  video_url: string | null;
  content_images: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: BlogUser;
}

export interface BlogsResponse {
  success: boolean;
  data: BlogPost[];
}

export const useBlogs = () => {
  const query = useQuery(
    ["blogs"],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/blog`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return response.json() as Promise<BlogsResponse>;
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  );

  return {
    blogs: query.data?.data || [],
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
};
