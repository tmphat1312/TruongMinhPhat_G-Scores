import { cn } from "@/lib/utils";

export function PageDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-gray-600 mt-2", className)} {...props}>
      {children}
    </p>
  );
}
