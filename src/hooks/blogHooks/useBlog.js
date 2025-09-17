import { useQuery } from "react-query";

const fetchBlog = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/blog`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useBlog = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`blog`],
    queryFn: () => fetchBlog(),
  });

  return {
    data,
    isLoading,
  };
};
