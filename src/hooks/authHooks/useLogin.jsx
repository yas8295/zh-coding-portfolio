import { useMutation } from "react-query";
import { toast } from "react-toastify";

const mutateLogin = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/login`,
    {
      method: "POST",
      body: formData,
    }
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "An unknown error occurred");
  }
  return responseData;
};

export const useLogin = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data }) => mutateLogin(data),
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 3600000)
      );
      // Save user info for header display
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.user.name || data.user.email || "المستخدم",
          })
        );
      }
      toast.success("تم تسجيل الدخول  بنجاح");
    },

    onError: (error) => {
      const errorMessage = error.message.replace("Error: ", "");
      if (errorMessage.includes("Invalid credentials")) {
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else {
        toast.error(errorMessage || "حدث خطأ، حاول مرة أخرى");
      }
    },
  });

  return { mutate, isLoading, isSuccess };
};
