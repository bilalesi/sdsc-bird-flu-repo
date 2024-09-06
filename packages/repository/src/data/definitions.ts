import { FluType } from "@/models/types";

// NOTE: This chat gpt definitions :)
export const FLU_DEFINITIONS: Array<{
  name: FluType;
  details: {
    Subtype: string;
    Significance: string;
    "Notable Outbreaks": string;
  };
}> = [
  {
    name: "h5n1",
    details: {
      Subtype: "Highly pathogenic avian influenza (HPAI)",
      Significance:
        "Known for its high mortality rate in birds and has caused significant outbreaks in poultry. Can occasionally infect humans, and when it does, it is associated with a high mortality rate.",
      "Notable Outbreaks":
        "First emerged in 1997 in Hong Kong and has since caused numerous outbreaks in birds worldwide, with some cases of human infection.",
    },
  },
  {
    name: "h5n2",
    details: {
      Subtype:
        "Can be either highly pathogenic or low pathogenic avian influenza (LPAI)",
      Significance:
        "Associated with outbreaks in poultry, particularly in North America. While not as dangerous as H5N1 to humans, it can still cause economic damage in agriculture.",
      "Notable Outbreaks":
        "Various outbreaks, especially in poultry farms in the United States.",
    },
  },
  {
    name: "h7n2",
    details: {
      Subtype:
        "Typically low pathogenic avian influenza (LPAI), but can mutate into a highly pathogenic form",
      Significance:
        "Primarily affects birds but has occasionally infected humans, usually causing mild respiratory symptoms.",
      "Notable Outbreaks":
        "Human cases have been rare, but it has caused outbreaks in poultry.",
    },
  },
  {
    name: "h7n8",
    details: {
      Subtype: "A less common strain of avian influenza",
      Significance:
        "Identified in birds, particularly in the United States, and can be either highly pathogenic or low pathogenic.",
      "Notable Outbreaks":
        "An outbreak in Indiana in 2016 affected commercial turkey farms.",
    },
  },
];
