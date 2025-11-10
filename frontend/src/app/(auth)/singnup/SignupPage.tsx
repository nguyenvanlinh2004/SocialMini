import { SignupForm } from "@/app/(shared)/components/signup-form";

const SignupPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm className=" " />
      </div>
    </div>
  );
};

export default SignupPage;
