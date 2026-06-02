import { Suspense } from "react";
import LoaderComponent from "@/components/common/LoaderComponent";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
