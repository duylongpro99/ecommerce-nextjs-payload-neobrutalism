import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortValues = ["interested", "trending", "hot_and_new"] as const;

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("interested"),

  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  }),
};

export const loadProductFilters = createLoader(params);
