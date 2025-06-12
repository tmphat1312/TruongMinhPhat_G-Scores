import { SearchForm } from "@/components/search-form";

export default function SearchSoresPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Search Scores</h1>
        <p className="text-gray-600 mt-2">
          Enter a student&apos;s registration number to view their exam scores
        </p>
      </div>
      <SearchForm />
    </div>
  );
}
