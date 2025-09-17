import { useQuery } from "react-query";

const fetchServices = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/services`
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `An error occurred: ${response.statusText}` }));
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const useServices = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`services`],
    queryFn: fetchServices,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
