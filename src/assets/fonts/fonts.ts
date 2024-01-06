import { Manrope, Inter } from "next/font/google";

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  display: "swap",
  preload: true,
});
