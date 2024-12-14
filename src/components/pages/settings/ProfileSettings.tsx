import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProfile } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { RestaurantData } from "@/types/next-auth";
import Map from "./Map";
import { uploadImage } from "@/utils/supabase/storage";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  motto: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  image: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  restaurantData: Pick<
    RestaurantData,
    "name" | "email" | "phone" | "latitude" | "longitude"
  >;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  restaurantData,
}) => {
  const [isUploading, setIsUploading] = useState(false);
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
      motto: "",
      latitude: restaurantData.latitude || 0,
      longitude: restaurantData.longitude || 0,
      image: "",
    },
  });

  const currentImage = watch("image");

  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Use window.Image to avoid conflict with next/image
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = async () => {
        URL.revokeObjectURL(objectUrl);

        if (img.width !== 500 || img.height !== 200) {
          toast.error("Banner must be 500x200 pixels");
          return;
        }

        setIsUploading(true);
        try {
          const result = await uploadImage(file);
          if (result.url) {
            setValue("image", result.url);
            toast.success("Banner uploaded successfully");
          }
        } catch (error) {
          toast.error("Failed to upload banner");
          console.error("Error uploading banner:", error);
        } finally {
          setIsUploading(false);
        }
      };

      img.src = objectUrl;
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
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
              <FaEdit size={20} />
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

          <div className="w-full">
            <Textarea
              {...register("motto")}
              label="Motto"
              placeholder="Enter restaurant motto"
              errorMessage={errors.motto?.message}
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
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
