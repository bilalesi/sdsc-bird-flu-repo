import { Card, CardContent, CardHeader } from "@sdsc/ui/card";
import { getTotalData } from "@sdsc/repository";
import { Paragraph } from "@sdsc/ui/typography";
import ClearSingleFilter from "@/app/components/shared/molecules/clear-single-filter";

import type { FluType, Provenance } from "@sdsc/repository";

type Props = {
  gte: string;
  lte: string;
  flu: FluType;
  provenance: Provenance;
  bird: string;
};

export const dynamic = "force-dynamic";

export default async function Total({
  gte,
  lte,
  flu,
  provenance,
  bird,
}: Props) {
  const { total, countLastMonth, countLastYear } = await getTotalData({
    provenance,
    bird,
    startDate: gte,
    endDate: lte,
    fluType: flu,
  });

  return (
    <div className="w-full max-w-max flex flex-col gap-2">
      <div className="text-sm font-light uppercase flex items-center align-middle h-6">
        Total data
      </div>
      <Card className="hover:bg-gray-200 max-w-max w-full">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{total}</div>
          <div className="mt-3">
            <p className="text-xs font-light">last month: {countLastMonth}</p>
            <p className="text-xs font-light">last year: {countLastYear}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
