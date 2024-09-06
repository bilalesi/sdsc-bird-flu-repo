import { cn } from "@sdsc/lib/clsx";
import { ScrollArea } from "@sdsc/ui/scroll-area";
import {
  getGroupedBirdBySpecies,
  getGroupedBirdFluCasesByProvenance,
} from "@sdsc/repository";
import ClearSingleFilter from "@/app/components/shared/molecules/clear-single-filter";
import SidebarButton from "@/app/components/shared/molecules/sidebar-button";

import type { FluType, Provenance } from "@sdsc/repository";
import Empty from "@sdsc/ui/empty";

type Props = {
  gte: string;
  lte: string;
  bird: string;
  flu: FluType;
  provenance: Provenance;
};

export default async function CommonSidebar({
  gte,
  lte,
  flu,
  bird,
  provenance,
}: Props) {
  const [speciesData, provenanceData] = await Promise.all([
    getGroupedBirdBySpecies({
      provenance,
      startDate: gte,
      endDate: lte,
      fluType: flu,
    }),
    getGroupedBirdFluCasesByProvenance({
      bird,
      startDate: gte,
      endDate: lte,
      fluType: flu,
    }),
  ]);

  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-7 py-3 text-lg font-semibold tracking-tight w-full flex items-center">
            <span>Provenance</span>
            <ClearSingleFilter field="provenance" className="ml-auto" />
          </h2>
          <div className="space-y-1 py-2 px-4">
            {Boolean(provenanceData.length) ? (
              provenanceData.map(({ provenance: prov, count }) => (
                <SidebarButton
                  key={`${prov}/${count}`}
                  variant="secondary"
                  {...{
                    field: "provenance",
                    title: prov,
                    note: count,
                  }}
                />
              ))
            ) : (
              <Empty />
            )}
          </div>
        </div>
        <div className="py-2 w-full">
          <h2 className="relative px-7 py-3 text-lg font-semibold tracking-tight w-full flex items-center">
            <div>Species</div>
            <ClearSingleFilter field="bird" className="ml-auto" />
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2 px-2">
              {speciesData && Boolean(speciesData.length) ? (
                speciesData.map(({ bird, count }, i) => (
                  <SidebarButton
                    showAvatar
                    variant="ghost"
                    key={`${bird}/${count}`}
                    {...{
                      field: "bird",
                      title: bird,
                      note: count,
                    }}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
