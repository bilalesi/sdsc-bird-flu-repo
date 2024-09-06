"use client";

import { parseAsIsoDateTime, parseAsString, useQueryStates } from "nuqs";

export default function useQuery() {
  const [query, updateQuery] = useQueryStates(
    {
      gte: parseAsIsoDateTime.withOptions({ clearOnDefault: true }),
      lte: parseAsIsoDateTime.withOptions({ clearOnDefault: true }),
      flu: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
      provenance: parseAsString
        .withOptions({ clearOnDefault: true })
        .withDefault(""),
      bird: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    },
    {
      shallow: false,
    },
  );

  const clearQuery = () => updateQuery(null);

  return {
    query,
    clearQuery,
    updateQuery,
  };
}
