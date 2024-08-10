"use server";

import { redirect } from "next/navigation";

export async function updateSearchParams(formData: FormData) {
  const searchParams = new URLSearchParams();
  const entries = Array.from(formData.entries());
  for (const [key, value] of entries) {
    if (value && key !== "_url") {
      searchParams.set(key, value.toString().toLowerCase());
    }
  }
  const url = formData.get("_url") || "/orders";
  redirect(`${url}?${searchParams.toString()}`);
}
