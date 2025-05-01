import { AuthHeader } from "../common/auth/AuthHeader";
import { SignInForm } from "../components/auth/SignInForm";
export const LogIn = () => {
  return (
    <div>
      <AuthHeader
        title="Welcome Back,"
        description="Elevate Your Student Commerce Experience!"
      />
      <SignInForm />
    </div>
  );
};
