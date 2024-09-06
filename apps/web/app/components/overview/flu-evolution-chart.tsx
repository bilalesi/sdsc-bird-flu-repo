import React from "react";
import CustomLineChart from "@/app/components/shared/molecules/custom-line-chart";
import { ChartConfig } from "@sdsc/ui/chart";
import { getFluCountsPerMonth, Provenance } from "@sdsc/repository";

type Props = {
  gte: string;
  lte: string;
  bird: string;
  provenance: Provenance;
};

export default async function FluPropagationChart({
  gte,
  lte,
  bird,
  provenance,
}: Props) {
  const result = await getFluCountsPerMonth({
    provenance,
    bird,
    startDate: gte,
    endDate: lte,
  });

  const data = result.map((p) => ({
    date: new Date(Number(p.year), Number(p.month) - 1).toLocaleDateString(
      "fr-CH",
      {
        month: "short",
        year: "2-digit",
      },
    ),
    h5n1: p.h5n1,
    h5n2: p.h5n2,
    h7n2: p.h7n2,
    h7n8: p.h7n8,
  }));

  const charConfig = ["h5n1", "h5n2", "h7n2", "h7n8"].reduce<
    Record<string, { label: string; color: string }>
  >((acc, p, i) => {
    acc[p] = {
      label: p,
      color: `hsl(var(--chart-${i + 1}))`,
    };
    return acc;
  }, {}) satisfies ChartConfig;

  return (
    <CustomLineChart
      title="Flu evolution"
      subtitle="Showing total flu evolution per month"
      data={data}
      chartConfig={charConfig}
      areas={["h5n1", "h5n2", "h7n2", "h7n8"]}
    />
  );
}
