"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@sdsc/ui/avatar";
import { cn, getInitials } from "@sdsc/lib";
import useQuery from "@/app/components/shared/hooks/use-query-params";
import { Button, ButtonProps } from "@sdsc/ui/button";
import { DataKey } from "@/app/types";

type Props = {
  field: DataKey;
  title: string;
  note: number;
  showAvatar?: boolean;
  variant?: ButtonProps["variant"];
};

export default function SidebarButton({
  field,
  title,
  note,
  showAvatar = false,
  variant = "default",
}: Props) {
  const { query, updateQuery } = useQuery();
  const { refresh } = useRouter();

  const onQueryChange = () => {
    updateQuery({ [field]: title }, { history: "push" });
    refresh();
  };

  const isSelected = Boolean(query[field]) && query[field] === title;
  return (
    <Button
      variant={variant}
      className={cn("w-full justify-start font-normal px-3", {
        "bg-yellow-200": isSelected,
      })}
      onClick={onQueryChange}
    >
      {showAvatar && (
        <Avatar className="h-9 w-9 mr-4">
          <AvatarFallback
            title={title}
            className={cn({ "bg-white text-yellow-500": isSelected })}
          >
            {getInitials(title)}
          </AvatarFallback>
        </Avatar>
      )}
      {title}
      <span className="ml-auto text-muted-foreground">{note}</span>
    </Button>
  );
}
