import LoaderComponent from "@/components/common/LoaderComponent";
import LoginForm from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<LoaderComponent/>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
