import { useQuery } from "react-query";

const fetchProjectsDemo = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/projects_demo`
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `An error occurred: ${response.statusText}` }));
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const useProjectsDemo = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`projectsDemo`],
    queryFn: fetchProjectsDemo,
  });

  return {
    data: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};
