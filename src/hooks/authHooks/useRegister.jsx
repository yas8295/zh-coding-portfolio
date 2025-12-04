import { useMutation } from "react-query";
import { toast } from "react-toastify";

const mutateRegister = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      return await res.json();
    }
    // إذا لم تكن الاستجابة ناجحة، اقرأ الخطأ كـ JSON
    const errorData = await res.json();
    throw new Error(errorData.message || "An unknown error occurred");
  } catch (error) {
    // أعد رمي الخطأ لتلتقطه react-query
    throw new Error(error);
  }
};

export const useRegister = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data }) => mutateRegister(data),
    onSuccess: () => {
      toast.success("تم انشاء الحساب بنجاح");
    },

    onError: (error) => {
      const errorMessage = error.message.replace("Error: ", "");
      if (errorMessage.includes("The email has already been taken.")) {
        toast.error("البريد الالكتروني مستخدم بالفعل");
      } else {
        toast.error(errorMessage || "حدث خطأ ، حاول مرة أخرى");
      }
    },
  });

  return { mutate, isLoading, isSuccess };
};
