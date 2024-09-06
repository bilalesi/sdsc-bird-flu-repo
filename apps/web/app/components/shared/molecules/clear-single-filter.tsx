"use client";

import { Button, buttonVariants } from "@sdsc/ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@sdsc/lib";
import { DataKey } from "@/app/types";
import useQuery from "@/app/components/shared/hooks/use-query-params";

type Props = {
  field: DataKey;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export default function ClearSingleFilter({ field, className }: Props) {
  const { query, updateQuery } = useQuery();
  const onClick = () => updateQuery({ [field]: null });

  return (
    <Button
      size="icon"
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "w-6 h-6 p-1 shadow-md",
        className,
      )}
    >
      <RotateCcw className="h-4 w-4 text-zinc-400" />
    </Button>
  );
}
