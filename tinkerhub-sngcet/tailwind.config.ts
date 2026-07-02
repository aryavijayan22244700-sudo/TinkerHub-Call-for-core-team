import type { Config } from "tailwindcss";

// Design tokens for TinkerHub SNGCET — v2
//
// Direction: warm editorial. Cream paper, warm ink, and a muted rust accent
// (deliberately NOT the common AI-default terracotta #D97757 — picked a
// deeper, dustier rust instead) plus olive and mustard as supporting warmth.
// A handwritten marker face carries small annotations/underlines so the
// page reads as a person's notebook, not a template.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F1E6",
          dim: "#EEE6D4",
          card: "#FCF9F1",
        },
        ink: {
          DEFAULT: "#2B241C",
          soft: "#5B5044",
          faint: "#8A7F70",
        },
        rust: {
          DEFAULT: "#B04A2E",
          dark: "#8C3A22",
          light: "#EFC9BB",
        },
        olive: {
          DEFAULT: "#6F7A4F",
          dark: "#565F3C",
          light: "#DCE2C8",
        },
        mustard: {
          DEFAULT: "#D9A441",
          dark: "#B5842B",
        },
        line: {
          DEFAULT: "#DED2B8",
        },
        error: {
          DEFAULT: "#A33B2E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(43,36,28,0.04), 0 12px 28px -14px rgba(43,36,28,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
