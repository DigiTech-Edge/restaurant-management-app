"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input, Checkbox } from "@nextui-org/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import AuthCard from "@/components/shared/AuthCard";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle error from URL parameters
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      // Convert error parameter to user-friendly message
      const errorMessage =
        error === "Configuration"
          ? "Failed to authenticate with Google"
          : error;
      toast.error(errorMessage);
      router.push("/login");
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Login successful");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error: any) {
      console.error("Google sign-in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome!"
      subtitle="Enter your Credentials to access your account"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          label="Email address"
          labelPlacement="outside"
          placeholder="Enter your email"
          isDisabled={isLoading}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          classNames={{
            label: "text-[#5f0101]",
          }}
        />
        <div className="flex flex-col gap-2">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            isDisabled={isLoading}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            classNames={{
              label: "text-[#5f0101]",
            }}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <FaEye className="text-[#5f0101]" />
                ) : (
                  <FaEyeSlash className="text-[#5f0101]" />
                )}
              </button>
            }
          />
          <Link
            href="/forgot-password"
            className="text-[12px] text-[#5f0101] hover:underline flex justify-end"
          >
            Forgot password?
          </Link>
        </div>
        {/* <div className="flex justify-between items-center">
          <Checkbox
            {...register("rememberMe")}
            size="sm"
            isDisabled={isLoading}
            className="text-[#5f0101]"
          >
            Remember for 30 days
          </Checkbox>
        </div> */}
        <Button
          type="submit"
          color="danger"
          className="w-full bg-[#5f0101]"
          size="lg"
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <div className="text-center text-sm text-gray-500">or</div>
        <Button
          type="button"
          variant="bordered"
          className="w-full border-[#5f0101] text-[#5f0101]"
          size="lg"
          startContent={<FaGoogle />}
          isLoading={isGoogleLoading}
          onPress={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
