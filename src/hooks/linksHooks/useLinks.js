import { useQuery } from "react-query";

const fetchLinks = async () => {
  // const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/links`,
    {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const useLinks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`links`],
    queryFn: () => fetchLinks(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
