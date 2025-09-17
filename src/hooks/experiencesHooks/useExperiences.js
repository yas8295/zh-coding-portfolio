import { useQuery } from "react-query";

const fetchExperiences = async () => {
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/experiences`,
      {
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

export const useExperiences = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`experiences`],
    queryFn: () => fetchExperiences(),
  });

  return {
    data,
    isLoading,
  };
};
