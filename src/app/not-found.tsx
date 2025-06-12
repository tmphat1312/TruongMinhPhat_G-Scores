import { PageDescription } from "@/components/typography/page-description";
import { PageHeading } from "@/components/typography/page-heading";

export default function NotFound() {
  return (
    <div>
      <PageHeading>Page Not Found</PageHeading>
      <PageDescription>
        The page you are looking for does not exist or has been moved. Please
        check the URL or return to the homepage.
      </PageDescription>
    </div>
  );
}
