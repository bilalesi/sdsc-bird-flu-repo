import { NextRequest } from "next/server";
import { getAnalyticsTimeline } from "@sdsc/repository";
import groupBy from "lodash/groupBy";
import get from "lodash/get";

export const POST = async (request: NextRequest) => {
  const query = await request.json();

  const results = await getAnalyticsTimeline({
    provenance: get(query, "provenance"),
    bird: get(query, "bird"),
    endDate: get(query, "lte"),
    startDate: get(query, "gte"),
    fluType: get(query, "flu"),
  });

  const groupedData = groupBy(results, "date");
  return Response.json(groupedData);
};
