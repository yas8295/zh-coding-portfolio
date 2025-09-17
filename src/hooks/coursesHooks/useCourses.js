import { useQuery } from "react-query";

const fetchCourses = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/courses`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useCourses = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`courses`],
    queryFn: () => fetchCourses(),
  });

  return {
    data,
    isLoading,
  };
};
