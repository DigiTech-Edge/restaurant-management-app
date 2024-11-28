"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-sm:h-screen  max-w-screen-sm px-6 py-4">
        <CardHeader className="flex flex-col items-center pb-0">
          <h1 className="text-2xl font-bold mb-2 text-[#5f0101]">Welcome!</h1>
          <p className="text-sm text-[#5f0101]">
            Enter your Credentials to access your account
          </p>
        </CardHeader>
        <CardBody className="space-y-4 py-12">
          <form className=" flex flex-col gap-4">
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
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
