import { eq, and, count, gte, lte } from "drizzle-orm"
import { db } from "@/drizzle/client"
import { FluType } from "@/models/types"
import { birdFluCases } from "@/models/schema"

export default async function getGroupedBirdFluCasesByProvenance({
  startDate,
  endDate,
  fluType,
  bird,
}: {
  startDate?: string
  endDate?: string
  fluType?: FluType
  bird?: string
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
  if (bird) {
    whereConditions.push(eq(birdFluCases.species, bird))
  }

  const results = await db
    .select({
      provenance: birdFluCases.provenance,
      count: count(birdFluCases.id),
    })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .groupBy(birdFluCases.provenance)

  return results
}
