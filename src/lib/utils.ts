import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(num: number): string {
  return new Intl.NumberFormat().format(num);
}

const ForeignLanguageCodes = {
  N1: "English",
  N2: "Russian",
  N3: "French",
  N4: "Chinese",
  N5: "German",
  N6: "Japanese",
  N7: "Korean",
} as const;
type ForeignLanguageCode = keyof typeof ForeignLanguageCodes;

export function getLanguageNameFromCode(code: ForeignLanguageCode) {
  return ForeignLanguageCodes[code] || "Not available";
}
