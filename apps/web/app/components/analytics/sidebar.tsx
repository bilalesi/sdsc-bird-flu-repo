import { Card, CardContent } from "@sdsc/ui/card";
import { Label } from "@sdsc/ui/label";
import {
  getGroupedBirdBySpecies,
  getGroupedBirdFluCasesByFluType,
} from "@sdsc/repository";
import SidebarSelect from "../shared/molecules/sidebar-select";

import type { FluType, Provenance } from "@sdsc/repository";
import CustomDateRangePicker from "../shared/molecules/custom-date-picker";

type Props = {
  gte: string;
  lte: string;
  flu: FluType;
  provenance: Provenance;
  bird: string;
};

export default async function Sidebar({
  gte,
  lte,
  provenance,
  flu,
  bird,
}: Props) {
  const species = await getGroupedBirdBySpecies({
    provenance,
    startDate: gte,
    endDate: lte,
    fluType: flu,
  });

  const flus = await getGroupedBirdFluCasesByFluType({
    bird,
    provenance,
    startDate: gte,
    endDate: lte,
  });

  return (
    <Card className="w-full py-4 h-full">
      <CardContent className="px-3">
        <div className="py-2">
          <Label>Date</Label>
          <CustomDateRangePicker
            className="w-full"
            numberOfMonths={1}
            showPresets={false}
            position="start"
          />
        </div>
        <div className="py-2">
          <Label>Bird species</Label>
          <SidebarSelect
            field="bird"
            list={species.map((p) => p.bird)}
            defaultValue="Duck"
          />
        </div>
        <div className="py-2">
          <Label>Bird flu</Label>
          <SidebarSelect field="flu" list={flus ? Object.keys(flus) : []} />
        </div>
      </CardContent>
    </Card>
  );
}
