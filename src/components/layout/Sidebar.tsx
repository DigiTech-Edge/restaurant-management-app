"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaListAlt,
  FaUsers,
  FaConciergeBell,
  FaFileAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const mainRoutes = [
    { name: "Home", icon: FaHome, path: "/" },
    { name: "Orders", icon: FaUtensils, path: "/orders" },
    { name: "Menu", icon: FaListAlt, path: "/menu" },
    { name: "Kitchen Management", icon: FaUsers, path: "/kitchen-management" },
    { name: "Reservations", icon: FaConciergeBell, path: "/reservations" },
    { name: "Report", icon: FaFileAlt, path: "/report" },
  ];

  const secondaryRoutes = [
    // { name: "Profile", icon: FaUser, path: "/profile" },
    { name: "Settings", icon: FaCog, path: "/settings" },
    { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
  ];

  return (
    <div className="flex flex-col h-screen sticky top-0">
      {/* Main routes sidebar */}
      <div className="flex flex-col bg-[#5F0101] items-center w-20 text-white mx-4 rounded-b-lg shadow-lg flex-grow">
        {mainRoutes.map((route, index) => {
          const isActive = pathname === route.path;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className={`flex flex-col items-center relative py-4 cursor-pointer w-full 
              }`}
              onClick={() => router.push(route.path)}
            >
              {isActive && (
                <span className="absolute left-0 top-0 w-[6px] h-full bg-white " />
              )}
              <route.icon size={28} />
              <span className="text-[9px] text-center mt-1">{route.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Secondary routes sidebar */}
      <div className="flex flex-col bg-[#5F0101] items-center w-20 text-white m-4 rounded-lg shadow-lg">
        {secondaryRoutes.map((route, index) => {
          const isActive = pathname === route.path;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`flex flex-col items-center py-4 cursor-pointer w-full ${
                isActive ? "bg-maroon-light" : ""
              }`}
              onClick={() => router.push(route.path)}
            >
              <route.icon size={28} />
              <span className="text-[9px] text-center mt-1">{route.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
