export type DataKey = "gte" | "lte" | "bird" | "provenance" | "flu";
export type MapData = Array<{
  bird: string;
  lng: number | null;
  lat: number | null;
  count: number;
  date: string;
}>;
