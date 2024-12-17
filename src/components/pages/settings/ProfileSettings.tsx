import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProfile } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { RestaurantData } from "@/types/next-auth";
import Map from "./Map";
import { uploadImage } from "@/utils/supabase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const profileSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  latitude: z.number(),
  longitude: z.number(),
  image: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  restaurantData: Pick<
    RestaurantData,
    "name" | "email" | "phone" | "latitude" | "longitude" | "image"
  >;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  restaurantData,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [position, setPosition] = useState<[number, number]>([
    restaurantData.latitude || 0,
    restaurantData.longitude || 0,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: restaurantData.name || "",
      email: restaurantData.email || "",
      phone: restaurantData.phone || "",
      latitude: restaurantData.latitude || 0,
      longitude: restaurantData.longitude || 0,
      image: restaurantData.image || "",
    },
  });

  const currentImage = watch("image");

  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !session?.user?.id) {
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadImage(
        file,
        session.user.id,
        "banners",
        (progress: number) => {
          console.log(`Upload progress: ${progress}%`);
        }
      );

      if (result.error) {
        toast.error(result.error.message);
        return;
      }
      if (result.url) {
        setValue("image", result.url);
        toast.success("Banner uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload banner");
      console.error("Error uploading banner:", error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      if (isUploading) {
        toast.error("Please wait for the banner to finish uploading");
        return;
      }

      await updateProfile(data);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(errorMessage);
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Restaurant Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
            {currentImage ? (
              <Image
                src={currentImage}
                alt="Restaurant Banner"
                fill
                className="object-cover"
                sizes="500px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No banner uploaded
              </div>
            )}
            <label
              htmlFor="banner-upload"
              className="absolute bottom-4 right-4 bg-[#5F0101] text-white p-3 rounded-full cursor-pointer hover:bg-[#4a0101] transition-colors z-10"
            >
              {isUploading ? (
                <FaSpinner className="animate-spin" size={20} />
              ) : (
                <FaEdit size={20} />
              )}
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerUpload}
                disabled={isUploading}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Upload a 500x200 pixel banner image
          </p>
        </div>

        <div className="space-y-6">
          <div className="w-full">
            <Input
              {...register("name")}
              label="Restaurant Name"
              placeholder="Enter restaurant name"
              errorMessage={errors.name?.message}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("email")}
              label="Email"
              placeholder="Enter restaurant email"
              type="email"
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("phone")}
              label="Phone"
              placeholder="Enter restaurant phone"
              type="tel"
              errorMessage={errors.phone?.message}
            />
          </div>

          <Map
            position={position}
            onPositionChange={(newPos) => {
              setPosition(newPos);
              setValue("latitude", newPos[0]);
              setValue("longitude", newPos[1]);
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="bg-[#5F0101] text-white"
            isLoading={isUpdating}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
