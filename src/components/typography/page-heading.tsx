import { cn } from "@/lib/utils";

export function PageHeading({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-3xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
}
