import React from "react";
import { FaUtensils, FaLock } from "react-icons/fa";
import { updateSearchParams } from "@/utils/actions/searchParams.action";

interface SettingsSidebarProps {
  activeSection: string;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeSection }) => {
  const sections = [
    { name: "Restaurant Profile", icon: FaUtensils, key: "profile" },
    { name: "Security", icon: FaLock, key: "security" },
  ];

  return (
    <div className="w-full md:w-64 mb-8 md:mb-0">
      <nav className="space-y-2">
        {sections.map((section) => (
          <form key={section.key} action={updateSearchParams}>
            <input type="hidden" name="section" value={section.key} />
            <input type="hidden" name="_url" value="/settings" />
            <button
              type="submit"
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeSection === section.key
                  ? "bg-[#5F0101] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <section.icon className="mr-3" />
              {section.name}
            </button>
          </form>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
