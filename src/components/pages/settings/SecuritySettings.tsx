import React from "react";
import { Input, Button } from "@nextui-org/react";

const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Security Settings</h2>
      <div className="space-y-4">
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter current password"
        />
        <Input
          label="New Password"
          type="password"
          placeholder="Enter new password"
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
        />
      </div>
      <Button color="primary" className="bg-[#5F0101] text-white">
        Change Password
      </Button>
    </div>
  );
};

export default SecuritySettings;
