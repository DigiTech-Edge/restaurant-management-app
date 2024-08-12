import PageHeader from "@/components/global/PageHeader";
import SettingsContent from "@/components/pages/settings/SettingsContent";

export default function SettingsPage({
  searchParams,
}: {
  searchParams: { section?: string };
}) {
  return (
    <>
      <PageHeader title="Settings" showDate={false} />
      <SettingsContent section={searchParams.section || "profile"} />
    </>
  );
}
