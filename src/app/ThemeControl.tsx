"use client";

import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "./vars.stylex";
import { useState } from "react";

export default function ThemeControl({
  children,
  style,
}: Readonly<{
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}>) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <body {...stylex.props(themes[theme], styles.container, style)}>
      <button
        {...stylex.props(styles.btn)}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
      {children}
    </body>
  );
}

const styles = stylex.create({
  container: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    minHeight: {
      default: "100vh",
      "@supports (height: 100dvh)": "100dvh",
    },
  },
  btn: {
    appearance: "none",
    backgroundColor: "transparent",
    borderRadius: 4,
    borderStyle: "none",
    color: colors.fg,
    cursor: "pointer",
    height: 32,
    opacity: 0.5,
    padding: spacing.xxs,
    width: 32,
    position: "absolute",
    right: spacing.sm,
    top: spacing.sm,
    transition: "opacity 0.2s ease-in-out",
    ":hover": {
      opacity: 0.8,
    },
  },
});

const themes = stylex.create({
  dark: { colorScheme: "dark" },
  light: { colorScheme: "light" },
});

type Props = {
  style?: stylex.StyleXStyles;
};

function SunIcon({ style }: Props) {
  return (
    <svg
      {...stylex.props(style)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ style }: Props) {
  return (
    <svg
      {...stylex.props(style)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
