import React, { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updatePassword } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordSettings: React.FC = () => {
  const { data: session } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to change your password");
      return;
    }

    setIsUpdating(true);
    try {
      await updatePassword({
        email: session.user.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      reset(); // Clear the form
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      toast.error(errorMessage);
      console.error("Error updating password:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#5F0101]/10">
          <FaLock className="text-[#5F0101] text-xl" />
        </div>
        <h2 className="text-2xl font-bold">Change Password</h2>
      </div>

      <Card className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("oldPassword")}
                type={showOldPassword ? "text" : "password"}
                label="Current Password"
                placeholder="Enter your current password"
                errorMessage={errors.oldPassword?.message}
                isInvalid={!!errors.oldPassword}
                classNames={{
                  label: "text-sm font-medium text-gray-700",
                }}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="focus:outline-none"
                  >
                    {showOldPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                }
              />
              <p className="text-xs text-gray-500">
                Enter your current password to verify it&apos;s you
              </p>
            </div>

            <div className="space-y-2">
              <Input
                {...register("newPassword")}
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter your new password"
                errorMessage={errors.newPassword?.message}
                isInvalid={!!errors.newPassword}
                classNames={{
                  label: "text-sm font-medium text-gray-700",
                }}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="focus:outline-none"
                  >
                    {showNewPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                }
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              placeholder="Confirm your new password"
              errorMessage={errors.confirmPassword?.message}
              isInvalid={!!errors.confirmPassword}
              classNames={{
                label: "text-sm font-medium text-gray-700",
              }}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              }
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              color="primary"
              className="w-full bg-[#5F0101] text-white"
              size="lg"
              isLoading={isUpdating}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating Password..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PasswordSettings;
