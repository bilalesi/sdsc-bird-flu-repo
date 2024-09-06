import { eq, and, count, gte, lte, sql } from "drizzle-orm"
import { db } from "@/drizzle/client"
import { birdFluCases } from "@/models/schema"

import type { FluType, Provenance } from "@/models/types"

export default async function getAnalyticsTimeline({
  startDate,
  endDate,
  fluType,
  provenance,
  bird,
}: {
  startDate?: string
  endDate?: string
  bird?: string
  fluType?: FluType
  provenance?: Provenance
}) {
  const whereConditions: any[] = []

  if (startDate && endDate) {
    whereConditions.push(
      and(
        gte(birdFluCases.timestamp, startDate),
        lte(birdFluCases.timestamp, endDate)
      )
    )
  } else if (startDate) {
    whereConditions.push(gte(birdFluCases.timestamp, startDate))
  } else if (endDate) {
    whereConditions.push(lte(birdFluCases.timestamp, endDate))
  }

  if (fluType) {
    whereConditions.push(eq(birdFluCases[fluType], 1))
  }

  if (provenance) {
    whereConditions.push(eq(birdFluCases.provenance, provenance))
  }

  if (bird) {
    whereConditions.push(eq(birdFluCases.species, bird))
  }

  const results = await db
    .select({
      bird: birdFluCases.species,
      lng: birdFluCases.longitude,
      lat: birdFluCases.latitude,
      count: count(birdFluCases.id),
      date: sql`strftime('%Y-%m', ${birdFluCases.timestamp})`,
    })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .groupBy(
      sql`strftime('%Y-%m', ${birdFluCases.timestamp})`,
      birdFluCases.longitude,
      birdFluCases.latitude
    )

  return results
}
