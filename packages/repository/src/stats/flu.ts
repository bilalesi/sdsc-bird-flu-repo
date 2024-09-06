import { eq, and, gte, lte, sum, sql } from "drizzle-orm";
import { birdFluCases } from "@/models/schema";
import { db } from "@/drizzle/client";
import { Provenance } from "@/models/types";

export default async function getGroupedBirdFluCasesByFluType({
  startDate,
  endDate,
  provenance,
  bird,
}: {
  startDate?: string;
  endDate?: string;
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

  if (bird) {
    whereConditions.push(eq(birdFluCases.species, bird));
  }

  const results = await db
    .select({
      h5n1: sum(birdFluCases.h5n1).as("h5n1_count"),
      h5n2: sum(birdFluCases.h5n2).as("h5n2_count"),
      h7n2: sum(birdFluCases.h7n2).as("h7n2_count"),
      h7n8: sum(birdFluCases.h7n8).as("h7n8_count"),
    })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .get();

  return results;
}

export async function getFluCountsPerMonth({
  startDate,
  endDate,
  provenance,
  bird,
}: {
  startDate?: string;
  endDate?: string;
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

  if (bird) {
    whereConditions.push(eq(birdFluCases.species, bird));
  }

  return db
    .select({
      year: sql`strftime('%Y', ${birdFluCases.timestamp})`.as("year"),
      month: sql`strftime('%m', ${birdFluCases.timestamp})`.as("month"),
      h5n1: sql<number>`SUM(${birdFluCases.h5n1})`,
      h5n2: sql<number>`SUM(${birdFluCases.h5n2})`,
      h7n2: sql<number>`SUM(${birdFluCases.h7n2})`,
      h7n8: sql<number>`SUM(${birdFluCases.h7n8})`,
    })
    .from(birdFluCases)
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .groupBy(sql`strftime('%Y-%m', ${birdFluCases.timestamp})`)
    .orderBy(sql`strftime('%Y-%m', ${birdFluCases.timestamp})`);
}
