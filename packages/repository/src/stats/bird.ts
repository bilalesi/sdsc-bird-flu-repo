import { eq, and, count, gte, lte } from "drizzle-orm"
import { db } from "@/drizzle/client"
import { birdFluCases } from "@/models/schema"
import type { FluType, Provenance } from "@/models/types"

export default async function getGroupedBirdBySpecies({
  startDate,
  endDate,
  fluType,
  provenance,
}: {
  startDate?: string
  endDate?: string
  fluType?: FluType
  provenance: Provenance
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

  const results = await db
    .select({
      bird: birdFluCases.species,
      count: count(birdFluCases.id),
    })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .groupBy(birdFluCases.species)

  return results
}
