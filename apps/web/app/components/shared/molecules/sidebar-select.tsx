"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@sdsc/ui/select";
import { DataKey } from "@/app/types";
import useQuery from "@/app/components/shared/hooks/use-query-params";

type Props = {
  list: Array<string>;
  field: DataKey;
  defaultValue?: string;
};

export default function SidebarSelect({ list, field, defaultValue }: Props) {
  const { updateQuery } = useQuery();
  const { refresh } = useRouter();

  const onQueryChange = (value: string) => {
    updateQuery({ [field]: value }, { history: "push" });
    refresh();
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={onQueryChange}>
      <SelectTrigger className="w-full uppercase !ring-0">
        <SelectValue className="uppercase" defaultValue={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        {list.map((item, indx) => (
          <SelectItem key={`${item}/${indx}`} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
