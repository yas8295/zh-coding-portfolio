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
    let error = await res.json();
    if (!res.ok) {
      throw new Error(error?.email);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const useRegister = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data }) => mutateRegister(data),
    onSuccess: () => {
      toast.success("تم انشاء الحساب بنجاح");
    },

    onError: (data) => {
      if (data == "Error: Error: The email has already been taken.") {
        toast.error("البريد الالكتروني مستخدم بالفعل");
      } else {
        toast.error("حدث خطأ ، حاول مرة أخرى");
      }
    },
  });

  return { mutate, isLoading, isSuccess };
};
