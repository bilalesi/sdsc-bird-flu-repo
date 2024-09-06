import { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Sidebar from "@/app/components/analytics/sidebar";
import { Card, CardContent } from "@sdsc/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@sdsc/ui/resizable";
import { type FluType, type Provenance } from "@sdsc/repository";

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

export const metadata: Metadata = {
  title: "Analytics",
  description: "Follow bird flu through out time and location",
};

export default async function Analytics({
  searchParams: { bird, flu, gte, lte, provenance },
}: Props) {
  const MapSSR = dynamicImport(() => import("@/app/components/analytics/map"), {
    ssr: false,
  });

  return (
    <div className="h-[calc(100vh-4rem)] w-full p-4">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={70} minSize={40}>
          <Card className="w-full h-full">
            <CardContent className="w-full h-full p-0">
              <MapSSR {...{ bird, flu, gte, lte, provenance }} />
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={30} maxSize={30}>
          <div className="px-4 w-ful h-full">
            <Sidebar
              {...{
                bird: bird ?? "Duck",
                flu,
                gte,
                lte,
                provenance,
              }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
