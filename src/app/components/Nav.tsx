'use client';
import React from "react";
import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { spacing } from "../vars.stylex";
import { usePathname } from 'next/navigation';

export function Nav() {
  const pathname = usePathname();
  
  // Only render nav on search and bang pages
  if (pathname !== '/search' && pathname !== '/bang') {
    return null;
  }

  return (
    <nav {...stylex.props(styles.navContainer)}>
      <Link {...stylex.props(styles.navLink)} href="/search">
        Search
      </Link>
      <a
        {...stylex.props(styles.navLink)}
        href="https://home.jaredcervantes.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Personal Applications
      </a>
      <Link {...stylex.props(styles.navLink)} href="/bang">
        Bang
      </Link>
    </nav>
  );
}

const styles = stylex.create({
  navContainer: {
    display: "flex",
    gap: {
      default: spacing.sm,  // Reduced gap for mobile
      "@media (min-width: 768px)": spacing.xl, // Keep original gap for desktop
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
      default: "48px", // Make room for the dark mode toggle
      "@media (min-width: 768px)": spacing.sm,
    },
  },
  navLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "8px",
    width: "fit-content",
    textAlign: "center",
  },
});

export default Nav;
