import { Suspense } from "react";
import PageHeader from "@/components/global/PageHeader";
import SettingsContent from "@/components/pages/settings/SettingsContent";
import { auth } from "@/utils/auth/auth";
import { RestaurantData } from "@/types/next-auth";
import { Spinner } from "@nextui-org/react";

function SettingsLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
      <Spinner size="lg" color="danger" />
    </div>
  );
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();

  if (!session?.user) {
    return null; // or redirect to login
  }

  const restaurantData: Pick<
    RestaurantData,
    "name" | "email" | "phone" | "latitude" | "longitude" | "image"
  > = {
    name: session.user.restaurant.name || "",
    email: session.user.restaurant.email || "",
    phone: session.user.restaurant.phone || "",
    latitude: session.user.restaurant.latitude || 0,
    longitude: session.user.restaurant.longitude || 0,
    image: session.user.restaurant.image || "",
  };

  return (
    <>
      <PageHeader title="Settings" showDate={false} />
      <Suspense fallback={<SettingsLoading />}>
        <SettingsContent
          section={resolvedSearchParams.section || "profile"}
          restaurantData={restaurantData}
        />
      </Suspense>
    </>
  );
}
