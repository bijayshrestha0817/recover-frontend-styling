"use client";
import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { Manrope } from "next/font/google";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});
export const theme = createTheme({
  fontFamily: `${manropeSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  colors: {
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
    "light-june": [
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
      "grey",
      "black",
      "white",
    ],
  },
});
