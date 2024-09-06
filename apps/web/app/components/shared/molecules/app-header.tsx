import { usePathname } from "next/navigation";
import { Link } from "@sdsc/ui/link";
import { Tabs, TabsList, TabsTrigger } from "@sdsc/ui/tabs";

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <Tabs defaultValue="/overview" value={pathname} className="space-y-4">
      <TabsList>
        <TabsTrigger value="/home">
          <Link href="/">Home</Link>
        </TabsTrigger>
        <TabsTrigger value="/overview">
          <Link href="/overview">Overview</Link>
        </TabsTrigger>
        <TabsTrigger value="/analytics" asChild>
          <Link href="/analytics">Analytics</Link>
        </TabsTrigger>
        <TabsTrigger value="/reports" asChild disabled>
          <Link href="/reports" aria-disabled>
            Reports (coming soon)
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
