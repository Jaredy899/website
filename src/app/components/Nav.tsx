import React from "react";
import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { spacing } from "../vars.stylex";

export function Nav() {
  return (
    <nav {...stylex.props(styles.navContainer)}>
      <Link {...stylex.props(styles.navLink)} href="/blog">
        Blog
      </Link>
      <a
        {...stylex.props(styles.navLink)}
        href="https://home.jaredcervantes.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Personal Applications
      </a>
      <a
        {...stylex.props(styles.navLink)}
        href="https://github.com/Jaredy899"
        target="_blank"
        rel="noopener noreferrer"
      >
        Projects
      </a>
    </nav>
  );
}

const styles = stylex.create({
  navContainer: {
    display: "flex",
    gap: spacing.xl,
    left: 0,
    padding: spacing.sm,
    position: "absolute",
    top: 8,
    width: "auto",
  },
  navLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "8px",
  },
});

export default Nav;
