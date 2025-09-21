import { useQuery } from "react-query";

const fetchTeam = async () => {
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/team-members`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useTeam = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`team`],
    queryFn: () => fetchTeam(),
  });

  return {
    data,
    isLoading,
  };
};
