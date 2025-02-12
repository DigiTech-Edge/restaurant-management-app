"use client";

import React from "react";
import { motion } from "framer-motion";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import { RestaurantData } from "@/types/next-auth";
import { useRouter, useSearchParams } from "next/navigation";

interface SettingsContentProps {
  section: string;
  restaurantData: Pick<
    RestaurantData,
    "name" | "email" | "phone" | "latitude" | "longitude" | "image"
  >;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  section,
  restaurantData,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSectionChange = (newSection: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", newSection);
    router.push(`/settings?${params.toString()}`, { scroll: false });
  };

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
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="md:sticky md:top-4 h-fit">
        <SettingsSidebar
          activeSection={section}
          onSectionChange={handleSectionChange}
        />
      </aside>
      <motion.main
        className="flex-1 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.main>
    </div>
  );
};

export default SettingsContent;
