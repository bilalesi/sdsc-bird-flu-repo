import * as fs from "fs"
import * as path from "path"
import chunk from "lodash/chunk"
import { parse } from "csv-parse"
import { db } from "@/drizzle/client"

import { birdFluCases } from "@/models/schema"

const seed = async () => {
  const transformedData: Array<any> = []
  const parser = fs
    .createReadStream(
      path.join(__dirname, "../data/fake_bird_data_switzerland_v2.csv")
    )
    .pipe(
      parse({
        columns: true,
        skipEmptyLines: true,
        delimiter: ",",
      })
    )
  for await (const row of parser) {
    transformedData.push({
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
      species: row.species,
      h5n1: row.H5N1 ? parseFloat(row.H5N1) : null,
      h5n2: row.H5N2 ? parseFloat(row.H5N2) : null,
      h7n2: row.H7N2 ? parseFloat(row.H7N2) : null,
      h7n8: row.H7N8 ? parseFloat(row.H7N8) : null,
      timestamp: row.timestamp,
      provenance: row.provenance,
    })
  }

  for (const ck of chunk(transformedData, 100)) {
    await db.insert(birdFluCases).values(ck)
  }
}

// Call the function to insert data
seed()
