import { SearchForm } from "@/components/search-form";
import { PageDescription } from "@/components/typography/page-description";
import { PageHeading } from "@/components/typography/page-heading";

export default function SearchSoresPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <PageHeading>Search Scores</PageHeading>
        <PageDescription>
          Enter a student&apos;s registration number to view their exam scores
        </PageDescription>
      </div>
      <SearchForm />
    </div>
  );
}
