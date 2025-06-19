import { NextResponse } from "next/server";
import { verifyEmail } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const { email, verificationCode } = await request.json();

    if (!email || !verificationCode) {
      return NextResponse.json(
        { message: "Email and verification code are required" },
        { status: 400 }
      );
    }

    const response = await verifyEmail(email, verificationCode);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to verify email" },
      { status: 500 }
    );
  }
}