import { cn } from "@/lib/utils";

export default function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container max-w-8xl", className)} {...props} />;
}
