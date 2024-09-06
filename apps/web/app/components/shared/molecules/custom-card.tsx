"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@sdsc/ui/card";
import useQuery from "@/app/components/shared/hooks/use-query-params";
import { DataKey } from "@/app/types";

type Props = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  keys: Partial<Record<DataKey, any>>;
};

export default function CustomCard({ title, body, icon, keys }: Props) {
  const { updateQuery } = useQuery();
  const { refresh } = useRouter();

  const onQueryChange = () => {
    updateQuery(keys, { history: "push" });
    refresh();
  };

  return (
    <Card
      className="hover:bg-gray-200 cursor-pointer h-full"
      onClick={onQueryChange}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-light uppercase">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
