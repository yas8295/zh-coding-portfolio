import { useQuery } from "react-query";
import { BlogUser } from "./useBlogs";

export interface BlogComment {
  id: number;
  comment_text: string;
  user_id: number;
  blog_post_id: number;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  user?: BlogUser;
  replies?: BlogComment[];
}

export interface BlogDetail {
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
  comments: BlogComment[];
}

export interface BlogDetailResponse {
  success: boolean;
  data: BlogDetail;
}

export const useBlogDetail = (blogId: number | string | undefined) => {
  const query = useQuery(["blog", blogId], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/blog/${blogId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }
    return response.json() as Promise<BlogDetailResponse>;
  });

  return {
    blog: query.data?.data,
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
};
