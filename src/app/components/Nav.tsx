'use client';
import React from "react";
import * as stylex from "@stylexjs/stylex";
import { spacing } from "../vars.stylex";

export function Nav() {
  return (
    <nav {...stylex.props(styles.navContainer)} />
  );
}

const styles = stylex.create({
  navContainer: {
    display: "flex",
    gap: {
      default: spacing.sm,
      "@media (min-width: 768px)": spacing.xl,
    },
    left: 0,
    padding: spacing.sm,
    position: "absolute",
    top: 8,
    width: "auto",
    flexDirection: {
      default: "column",
      "@media (min-width: 768px)": "row",
    },
    paddingRight: {
      default: "48px",
      "@media (min-width: 768px)": spacing.sm,
    },
    alignItems: "center",
  },
});

export default Nav;
