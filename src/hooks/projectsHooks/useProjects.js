import { useQuery } from "react-query";

const fetchProjects = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/projects`
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `An error occurred: ${response.statusText}` }));
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const useProjects = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`projects`],
    queryFn: fetchProjects,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
