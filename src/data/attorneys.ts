import data from "./attorneys.json";
export type Attorney = {
  slug: string;
  name: string;
  position: string;
  image: string;
  email: string;
  bio: string;
  fields: Record<string, string[] | undefined>;
  source: string;
};
export const attorneys: Attorney[] = data;
