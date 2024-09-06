import { Metadata } from "next";
import { Button } from "@sdsc/ui/button";

import { Paragraph } from "@sdsc/ui/typography";
import { FluType, Provenance } from "@sdsc/repository";
import {
  FluStatistics,
  FluEvolutionChart,
  TotalData,
  Sidebar,
} from "@/app/components/overview";
import CustomDateRangePicker from "@/app/components/shared/molecules/custom-date-picker";
import ClearAllFilters from "@/app/components/shared/molecules/clear-all-filters";

export const metadata: Metadata = {
  title: "Overview",
  description: "Bird flu control system dashboard overview",
};

type Props = {
  searchParams: {
    gte: string;
    lte: string;
    flu: FluType;
    provenance: Provenance;
    bird: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Overview({ searchParams }: Props) {
  return (
    <div className="w-full h-full">
      <div className="hidden flex-col md:flex h-full">
        <div className="flex-1 space-y-4 p-8 pt-6 h-full">
          <div className="flex items-start justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Bird Flu Overview
              </h2>
              <Paragraph className="font-light text-justify">
                Track and analyze bird flu outbreaks over time and species
              </Paragraph>
            </div>
            <div className="flex items-center space-x-2">
              <ClearAllFilters />
              <CustomDateRangePicker className="w-64" />
              <Button variant="default">Download</Button>
            </div>
          </div>
          <div className="grid grid-cols-[300px_1fr] gap-4 overflow-auto">
            <Sidebar {...{ ...searchParams }} />
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <TotalData {...{ ...searchParams }} />
                <FluStatistics {...{ ...searchParams }} />
              </div>
              <FluEvolutionChart {...{ ...searchParams }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
