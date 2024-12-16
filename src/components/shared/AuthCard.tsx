"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

const AuthCard = ({
  title,
  subtitle,
  children,
  imageSrc = "/images/login/funchef.png",
  imageAlt = "Chef",
}: AuthCardProps) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background circles */}
      <div className="absolute -right-[23%] top-1/2 transform -translate-y-1/2 w-[750px] h-[100vh] rounded-l-full bg-[#5F0101] opacity-40" />
      <div className="absolute -right-[18%] top-1/2 transform -translate-y-1/2 w-[600px] h-[88vh] rounded-l-full bg-[#5F0101] opacity-30" />
      <div className="absolute -right-[10%] top-1/2 transform -translate-y-1/2 w-[400px] h-[70vh] rounded-l-full bg-[#5F0101]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -right-[47%] top-1/2 -translate-y-1/2 pointer-events-none z-10 max-sm:hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={200}
            className="object-cover"
            priority
            unoptimized
            onError={(e) => {
              console.error("Image load error:", e);
            }}
          />
        </div>
        <Card className="w-full max-sm:h-screen max-w-screen-sm px-6 py-4 bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-col items-center pb-0">
            <h1 className="text-2xl font-bold mb-2 text-[#5f0101]">{title}</h1>
            <p className="text-sm text-[#5f0101]">{subtitle}</p>
          </CardHeader>
          <CardBody className="space-y-4 py-12">{children}</CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthCard;
