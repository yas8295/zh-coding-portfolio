import { useQuery } from "react-query";

const fetchTeam = async () => {
  // const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/team-members`,
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

export const useTeam = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`team`],
    queryFn: () => fetchTeam(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
