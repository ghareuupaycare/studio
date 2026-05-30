/**
 * @fileOverview Main Data Hub for Ayurvedic Remedies.
 */

import { FEVER_REMEDIES } from "./fever-data";
import { COLD_REMEDIES } from "./cold-data";
import { COUGH_REMEDIES } from "./cough-data";
import { Remedy } from "./remedy-types";

export * from "./remedy-types";

export const REMEDIES: Remedy[] = [
  ...FEVER_REMEDIES,
  ...COLD_REMEDIES,
  ...COUGH_REMEDIES
];
