import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useAddComment = (blogId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      comment_text,
      parent_id,
    }: {
      comment_text: string;
      parent_id?: number;
    }) => {
      const token = JSON.parse(localStorage.getItem("token"))?.access_token;
      if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً");
      }

      const body: Record<string, unknown> = { comment_text };
      if (parent_id) {
        body.parent_id = parent_id;
      }

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/blog/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add comment");
      }

      return response.json();
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["blog", data?.comment?.blog_post_id]);
        toast.success(
          variables.parent_id
            ? "تم إضافة الرد بنجاح"
            : "تم إضافة التعليق بنجاح",
        );
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  );
};
