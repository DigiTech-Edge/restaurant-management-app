"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUtensils,
  FaListAlt,
  FaUsers,
  FaConciergeBell,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainRoutes = [
    { name: "Dashboard", icon: FaHome, path: "/", action: false },
    { name: "Orders", icon: FaUtensils, path: "/orders", action: false },
    { name: "Menu", icon: FaListAlt, path: "/menu", action: false },
    {
      name: "Kitchen Management",
      icon: FaUsers,
      path: "/kitchen-management",
      action: false,
    },
    {
      name: "Reservations",
      icon: FaConciergeBell,
      path: "/reservations",
      action: false,
    },
    { name: "Report", icon: FaFileAlt, path: "/report", action: false },
  ];

  const secondaryRoutes = [
    { name: "Settings", icon: FaCog, path: "/settings", action: false },
    { name: "Logout", icon: FaSignOutAlt, path: "/logout", action: true },
  ];

  const handleNavigation = (path: string, action?: boolean) => {
    if (action) {
      router.push("/login");
    } else {
      router.push(path);
    }
    setIsMobileMenuOpen(false);
  };

  const renderNavItems = (
    routes: typeof mainRoutes,
    isMobile: boolean = false
  ) => (
    <>
      {routes.map((route, index) => {
        const isActive = pathname === route.path;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            className={`flex ${
              isMobile ? "flex-row" : "flex-col"
            } items-center relative py-4 cursor-pointer w-full ${
              isMobile ? "px-4" : ""
            }`}
            onClick={() => handleNavigation(route.path, route.action)}
          >
            {isActive && (
              <span className="absolute left-0 top-0 w-[6px] h-full bg-white" />
            )}
            <route.icon size={28} className={isMobile ? "mr-4" : ""} />
            <span
              className={isMobile ? "text-base" : "text-[9px] text-center mt-1"}
            >
              {route.name}
            </span>
          </motion.div>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#5F0101]"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#5F0101] text-white overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  &times;
                </button>
              </div>
              <div className="flex-grow">
                {renderNavItems(mainRoutes, true)}
              </div>
              <div className="border-t border-gray-600 my-4"></div>
              <div className="mb-4">
                {renderNavItems(secondaryRoutes, true)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen sticky top-0">
        <div className="flex flex-col bg-[#5F0101] items-center w-20 text-white mx-4 rounded-b-lg shadow-lg flex-grow">
          {renderNavItems(mainRoutes)}
        </div>
        <div className="flex flex-col bg-[#5F0101] items-center w-20 text-white m-4 rounded-lg shadow-lg">
          {renderNavItems(secondaryRoutes)}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
