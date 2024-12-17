import React from "react";
import PasswordSettings from "./PasswordSettings";

const SecuritySettings: React.FC = () => {
  return (
    <div className="flex justify-center items-start w-full">
      <div className="w-full max-w-2xl">
        <PasswordSettings />
      </div>
    </div>
  );
};

export default SecuritySettings;
