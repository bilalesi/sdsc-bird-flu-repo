import { eq, and, count, gte, lte } from "drizzle-orm";
import { subYears, subMonths, format } from "date-fns";

import { birdFluCases } from "@/models/schema";
import { db } from "@/drizzle/client";
import type { FluType, Provenance } from "@/models/types";

export default async function getTotalData({
  startDate,
  endDate,
  fluType,
  provenance,
  bird,
}: {
  startDate?: string;
  endDate?: string;
  fluType?: FluType;
  provenance?: Provenance;
  bird?: string;
}) {
  const whereConditions: any[] = [];

  if (startDate && endDate) {
    whereConditions.push(
      and(
        gte(birdFluCases.timestamp, startDate),
        lte(birdFluCases.timestamp, endDate),
      ),
    );
  } else if (startDate) {
    whereConditions.push(gte(birdFluCases.timestamp, startDate));
  } else if (endDate) {
    whereConditions.push(lte(birdFluCases.timestamp, endDate));
  }

  if (provenance) {
    whereConditions.push(eq(birdFluCases.provenance, provenance));
  }

  if (fluType) {
    whereConditions.push(eq(birdFluCases[fluType], 1));
  }

  if (bird) {
    whereConditions.push(eq(birdFluCases.species, bird));
  }

  const now = new Date();

  const lastYear = format(subYears(now, 1), "yyyy-MM-dd");
  const lastMonth = format(subMonths(now, 1), "yyyy-MM-dd");

  const countLastYear = await db
    .select({
      count: count(),
    })
    .from(birdFluCases)
    .where(
      and(
        gte(birdFluCases.timestamp, lastYear),
        provenance ? eq(birdFluCases.provenance, provenance) : undefined,
        fluType ? eq(birdFluCases[fluType], 1) : undefined,
        bird ? eq(birdFluCases.species, bird) : undefined,
      ),
    )
    .get();

  const countLastMonth = await db
    .select({ count: count() })
    .from(birdFluCases)
    .where(
      and(
        gte(birdFluCases.timestamp, lastMonth),
        provenance ? eq(birdFluCases.provenance, provenance) : undefined,
        fluType ? eq(birdFluCases[fluType], 1) : undefined,
        bird ? eq(birdFluCases.species, bird) : undefined,
      ),
    )
    .get();

  const results = await db
    .select({ count: count() })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .get();

  return {
    total: results?.count,
    countLastYear: countLastYear?.count,
    countLastMonth: countLastMonth?.count,
  };
}
