"use client";

import React from "react";
import { FaUtensils, FaLock } from "react-icons/fa";

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const sections = [
    { name: "Restaurant Profile", icon: FaUtensils, key: "profile" },
    { name: "Security", icon: FaLock, key: "security" },
  ];

  return (
    <nav className="w-full md:w-64 space-y-2">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => onSectionChange(section.key)}
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${
            activeSection === section.key
              ? "bg-[#5F0101] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <section.icon className="mr-3" />
          {section.name}
        </button>
      ))}
    </nav>
  );
};

export default SettingsSidebar;
