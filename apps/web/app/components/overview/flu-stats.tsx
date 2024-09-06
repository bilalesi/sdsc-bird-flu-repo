import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@sdsc/ui/tooltip";

import { Paragraph } from "@sdsc/ui/typography";
import {
  FLU_DEFINITIONS,
  getGroupedBirdFluCasesByFluType,
} from "@sdsc/repository";
import CustomCard from "@/app/components/shared/molecules/custom-card";
import ClearSingleFilter from "@/app/components/shared/molecules/clear-single-filter";

import type { FluType, Provenance } from "@sdsc/repository";

type Props = {
  gte: string;
  lte: string;
  flu: FluType;
  provenance: Provenance;
  bird: string;
};

export default async function FluStats({ gte, lte, provenance, bird }: Props) {
  const result = await getGroupedBirdFluCasesByFluType({
    bird,
    provenance,
    startDate: gte,
    endDate: lte,
  });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="text-sm font-light uppercase flex items-center">
        Flus
        <ClearSingleFilter field="flu" className="ml-2" />
      </div>
      <div className="grid grid-flow-col gap-2 h-full">
        <TooltipProvider>
          {FLU_DEFINITIONS.map((sp) => (
            <Tooltip key={sp.name}>
              <TooltipTrigger>
                <CustomCard
                  title={sp.name}
                  body={
                    <div className="text-2xl font-bold text-left">
                      {result?.[sp.name] ?? 0}
                      <div className="uppercase text-left font-light text-xs">
                        cases
                      </div>
                    </div>
                  }
                  keys={{
                    flu: sp.name,
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-96">
                <Paragraph className="px-3 text-justify">
                  <ul className="list-disc">
                    {Object.entries(sp.details).map(([key, value]) => (
                      <li key={`${sp.name}/${key}`} className="my-2">
                        <span className="font-bold">{key}</span>:
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </Paragraph>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
