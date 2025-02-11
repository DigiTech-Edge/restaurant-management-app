import { Suspense } from "react";
import LoginForm from "@/components/auth/login/LoginForm";
import Image from "next/image";

function LoginFormFallback() {
  return <div>Loading...</div>;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
