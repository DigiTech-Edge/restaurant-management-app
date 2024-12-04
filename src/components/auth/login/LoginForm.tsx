"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthCard from "@/components/shared/AuthCard";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <AuthCard
      title="Welcome!"
      subtitle="Enter your Credentials to access your account"
      imageSrc="/images/login/funchef.png"
      imageAlt="Chef"
    >
      <form className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email address"
          labelPlacement="outside"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          classNames={{
            label: "text-[#5f0101]",
          }}
        />
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNames={{
              label: "text-[#5f0101]",
            }}
          />
          <Link
            href="#"
            className="text-[12px] text-[#5f0101] hover:underline flex justify-end"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <Checkbox
            isSelected={rememberMe}
            onValueChange={setRememberMe}
            size="sm"
            className="text-[#5f0101]"
          >
            Remember for 30 days
          </Checkbox>
        </div>
        <Button
          color="danger"
          className="w-full bg-[#5f0101]"
          size="lg"
          onClick={() => router.push("/")}
        >
          Sign In
        </Button>
        <div className="text-center text-sm text-gray-500">or</div>
        <Button
          variant="bordered"
          className="w-full border-[#5f0101] text-[#5f0101]"
          size="lg"
          startContent={<FaGoogle />}
        >
          Sign in with Google
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
