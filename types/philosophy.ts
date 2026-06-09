/** Background accent for a philosophy card — maps to a pastel theme token. */
export type PastelTone = "orange" | "green" | "blue" | "red";

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: string;
  tone: PastelTone;
}
