import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { birdFluCases } from "@/models/schema";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema: { birdFluCases } });
