import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const mutateContact = async (data) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/contact`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const usePostContact = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data }) => mutateContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "contact" });
      toast.success("تم ارسال الطلب بنجاح");
    },
    onError: () => toast.error("حدث خطأ، حاول مرة اخرى"),
  });

  return { mutate, isLoading };
};
