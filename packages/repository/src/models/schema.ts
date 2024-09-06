import { sqliteTable, text, real } from "drizzle-orm/sqlite-core"
import { createId } from "@paralleldrive/cuid2"

export const birdFluCases = sqliteTable("bird_flu_cases", {
  id: text("id").primaryKey().$defaultFn(createId),
  latitude: real("latitude"),
  longitude: real("longitude"),
  species: text("species").notNull(),
  h5n1: real("h5n1"),
  h5n2: real("h5n2"),
  h7n2: real("h7n2"),
  h7n8: real("h7n8"),
  timestamp: text("timestamp"),
  provenance: text("provenance").notNull(),
})

export type BirdFluCase = typeof birdFluCases.$inferSelect
