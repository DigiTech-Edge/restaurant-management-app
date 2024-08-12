import React, { useState } from "react";
import { Input, Textarea, Button, Avatar } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";

const ProfileSettings: React.FC = () => {
  const [avatar, setAvatar] = useState("");

  const defaultValues = {
    restaurantName: "Delicious Bites",
    address: "123 Foodie Street, Tasty Town",
    phone: "+1 (555) 123-4567",
    email: "info@deliciousbites.com",
    description:
      "A cozy restaurant serving mouthwatering dishes from around the world.",
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Restaurant Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar
            src={avatar}
            alt="Restaurant Logo"
            className="w-32 h-32 text-large"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-[#5F0101] text-white p-2 rounded-full cursor-pointer"
          >
            <FaEdit size={16} />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Restaurant Name"
          placeholder="Enter restaurant name"
          defaultValue={defaultValues.restaurantName}
        />
        <Input
          label="Address"
          placeholder="Enter restaurant address"
          defaultValue={defaultValues.address}
        />
        <Input
          label="Phone"
          placeholder="Enter restaurant phone"
          type="tel"
          defaultValue={defaultValues.phone}
        />
        <Input
          label="Email"
          placeholder="Enter restaurant email"
          type="email"
          defaultValue={defaultValues.email}
        />
        <Textarea
          label="Description"
          placeholder="Enter restaurant description"
          className="col-span-full"
          defaultValue={defaultValues.description}
        />
      </div>
      <div className="flex justify-end">
        <Button color="primary" size="lg" className="bg-[#5F0101] text-white">
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
