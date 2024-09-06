"use client";

import { Button } from "@sdsc/ui/button";
import { FilterX } from "lucide-react";
import useQuery from "@/app/components/shared/hooks/use-query-params";

export default function ClearFilters() {
  const { clearQuery } = useQuery();

  return (
    <Button
      size="icon"
      onClick={clearQuery}
      className="bg-yellow-400 hover:bg-yellow-300"
    >
      <FilterX className="h-4 w-4" />
    </Button>
  );
}
