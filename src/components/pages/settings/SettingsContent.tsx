"use client";

import React from "react";
import { motion } from "framer-motion";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import { RestaurantData } from "@/types/next-auth";

interface SettingsContentProps {
  section: string;
  restaurantData: Pick<
    RestaurantData,
    "name" | "email" | "phone" | "latitude" | "longitude"
  >;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  section,
  restaurantData,
}) => {
  const renderContent = () => {
    switch (section) {
      case "profile":
        return <ProfileSettings restaurantData={restaurantData} />;
      case "security":
        return <SecuritySettings />;
      default:
        return <ProfileSettings restaurantData={restaurantData} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      <SettingsSidebar activeSection={section} />
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default SettingsContent;
