"use client";

import React from "react";
import { motion } from "framer-motion";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";

interface SettingsContentProps {
  section: string;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
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
