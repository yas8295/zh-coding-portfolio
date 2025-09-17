import { useQuery } from "react-query";

const fetchProfile = async () => {
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/site-info`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `An error occurred: ${response.statusText}` }));
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const useProfile = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`profile`],
    queryFn: fetchProfile,
  });

  return { data, isLoading, isError, error, refetch };
};
