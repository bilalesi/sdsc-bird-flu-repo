import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FluType, Provenance } from "@sdsc/repository";
import type { MapData } from "@/app/types";

type FluTimelineArgs = {
  gte: string;
  lte: string;
  flu: FluType;
  provenance: Provenance;
  bird: string;
};

export default function useFluTimeline({
  gte,
  lte,
  flu,
  provenance,
  bird,
}: FluTimelineArgs) {
  const [data, setData] = useState<Record<string, MapData>>({});

  const onError = () => {
    toast.error(
      "An error encountered while gathering flu distribution, please try again",
      {
        dismissible: true,
        duration: 2000,
        position: "top-right",
        id: "flu-distribution",
      },
    );
  };

  const onSuccess = () => {
    toast.info("New flu distribution has been received", {
      dismissible: true,
      duration: 2000,
      position: "top-right",
      id: "flu-distribution",
    });
  };

  useEffect(() => {
    const isAborted = false;
    async function fetchFluTimeline() {
      try {
        const response = await fetch("/api/flu-timeline", {
          method: "post",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            gte,
            lte,
            flu,
            provenance,
            bird: bird ?? "Duck",
          }),
        });
        if (!response.ok) {
          onError();
        }
        if (!isAborted) {
          const result = await response.json();
          setData(result);
          onSuccess();
        }
      } catch (error) {
        onError();
      }
    }
    fetchFluTimeline();
  }, [gte, lte, flu, provenance, bird]);

  return {
    data,
  };
}
