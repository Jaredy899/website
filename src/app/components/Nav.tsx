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
      <Link {...stylex.props(styles.navLink)} href="/search" aria-label="Search">
        <div {...stylex.props(styles.iconContainer)}>
          <svg 
            {...stylex.props(styles.navIcon)} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </div>
      </Link>
      <a
        {...stylex.props(styles.navLink)}
        href="https://home.jaredcervantes.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Personal Applications"
      >
        <div {...stylex.props(styles.iconContainer)}>
          <svg 
            {...stylex.props(styles.navIcon)} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 576 512"
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
        </div>
      </a>
      <Link {...stylex.props(styles.navLink)} href="/bang" aria-label="Bang">
        <div {...stylex.props(styles.iconContainer)}>
          <svg 
            {...stylex.props(styles.navIcon)} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
          >
            <g>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              <path d="M208 120c13.3 0 24 10.7 24 24v88c0 13.3-10.7 24-24 24s-24-10.7-24-24v-88c0-13.3 10.7-24 24-24zm0 192a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
            </g>
          </svg>
        </div>
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
    flexDirection: "column", // Keep this as column for bang and search pages
    paddingRight: {
      default: "48px", // Make room for the dark mode toggle
      "@media (min-width: 768px)": spacing.sm,
    },
    alignItems: "center",
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
    display: "flex",
    justifyContent: "center",
  },
  iconContainer: {
    display: 'inline-flex',
    width: '1.5em',
    height: '1.5em',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  iconImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  navIcon: {
    width: '1.5em',
    height: '1.5em',
    fill: 'currentColor',
  },
});

export default Nav;
