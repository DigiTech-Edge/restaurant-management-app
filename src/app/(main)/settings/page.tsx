import PageHeader from "@/components/global/PageHeader";
import SettingsContent from "@/components/pages/settings/SettingsContent";
import { auth } from "@/utils/auth/auth";
import { RestaurantData } from "@/types/next-auth";

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
    "name" | "email" | "phone" | "latitude" | "longitude"
  > = {
    name: session.user.restaurant.name,
    email: session.user.restaurant.email,
    phone: session.user.restaurant.phone,
    latitude: session.user.restaurant.latitude,
    longitude: session.user.restaurant.longitude,
  };

  return (
    <>
      <PageHeader title="Settings" showDate={false} />
      <SettingsContent
        section={resolvedSearchParams.section || "profile"}
        restaurantData={restaurantData}
      />
    </>
  );
}
