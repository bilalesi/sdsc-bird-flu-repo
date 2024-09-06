import { db } from "@/drizzle/client"
import { birdFluCases } from "@/models/schema"

const select = async () => {
  const result = await db.select().from(birdFluCases).limit(10)
  console.log("@@results", result)
}

select()
