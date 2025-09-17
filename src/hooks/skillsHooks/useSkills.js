import { useQuery } from "react-query";

const fetchSkills = async () => {
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/skills`,
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

export const useSkills = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`skills`],
    queryFn: () => fetchSkills(),
  });

  return {
    data,
    isLoading,
  };
};
