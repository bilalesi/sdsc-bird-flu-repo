"use client";

import { FluType, Provenance } from "@sdsc/repository";
import { cn } from "@sdsc/lib";
import useFluTimeline from "@/app/components/shared/hooks/use-flu-timeline";

import "leaflet/dist/leaflet.css";
import useMap from "../shared/hooks/use-map";

type Props = {
  gte: string;
  lte: string;
  flu: FluType;
  provenance: Provenance;
  bird: string;
};

export default function Map({ gte, lte, flu, provenance, bird }: Props) {
  const { data } = useFluTimeline({
    gte,
    lte,
    flu,
    provenance,
    bird,
  });

  const { mapContainerRef, currentTimestamp } = useMap({
    data,
  });

  return (
    <div className="w-full h-full relative rounded-md">
      <div className="absolute top-4 right-4 font-light text-center text-white p-2 rounded-md shadow-md z-[9999] w-32 h-10 backdrop-blur-sm">
        {currentTimestamp}
      </div>
      <div
        ref={mapContainerRef}
        className={cn(
          "h-full rounded-md",
          "[&_.leaflet-layer]:filter [&_.leaflet-layer]:hue-rotate-180 [&_.leaflet-layer]:invert [&_.leaflet-layer]:brightness-95 [&_.leaflet-layer]:contrast-[90%]",
        )}
      />
    </div>
  );
}
