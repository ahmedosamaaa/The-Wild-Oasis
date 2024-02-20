import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    data,
    mutate: signup,
    isLoading,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfuly created! Please verify the new account from tthe user's email address."
      );
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  return { signup, isLoading, data };
}
