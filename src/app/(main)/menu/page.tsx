import { Suspense } from "react";
import PageHeaderSearch from "@/components/global/PageHeaderSearch";
import MenuClientWrapper from "@/components/pages/menu/MenuClientWrapper";
import { Spinner } from "@nextui-org/react";

function SearchBarFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="lg" color="danger" />
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Menu({ searchParams }: PageProps) {
  const { category } = await searchParams;

  return (
    <div>
      <Suspense fallback={<SearchBarFallback />}>
        <PageHeaderSearch title="Menu" />
      </Suspense>
      <MenuClientWrapper selectedCategory={category!} />
    </div>
  );
}
