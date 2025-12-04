import { useQuery } from "react-query";

const fetchPackages = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/packages`
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `An error occurred: ${response.statusText}` }));
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const usePackages = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  return {
    data: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};
