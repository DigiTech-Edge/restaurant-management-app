import { Suspense } from "react";
import PageHeaderSearch from "@/components/global/PageHeaderSearch";
import MenuClientWrapper from "@/components/pages/menu/MenuClientWrapper";

function SearchBarFallback() {
  return <>Loading categories...</>;
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Menu({ searchParams }: PageProps) {
  const { category } = await searchParams;

  return (
    <div className="p-6">
      <Suspense fallback={<SearchBarFallback />}>
        <PageHeaderSearch title="Menu" />
      </Suspense>
      <MenuClientWrapper selectedCategory={category!} />
    </div>
  );
}
