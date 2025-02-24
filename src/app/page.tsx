import * as stylex from "@stylexjs/stylex";
import Logo from "./Logo";
import { Link } from "next-view-transitions";
import { spacing } from "./vars.stylex";

export default function Home() {
  return (
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <Logo style={styles.logo} collapsible />
        <nav {...stylex.props(styles.nav)}>
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
          <a
            {...stylex.props(styles.navLink)}
            href="https://github.com/Jaredy899"
            target="_blank"
            rel="noopener noreferrer"
          >
            Projects
          </a>
        </nav>
      </header>
      <main></main>
      <footer {...stylex.props(styles.footer)}>
        <div {...stylex.props(styles.socialLinks)}>
          <a
            href="https://bsky.app/profile/jaredcervantes.com"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.footerLink)}
            aria-label="Bluesky Profile"
          >
            <svg 
              {...stylex.props(styles.icon)} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512"
            >
              <path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jared-cervantes/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.footerLink)}
            aria-label="LinkedIn Profile"
          >
            <svg 
              {...stylex.props(styles.icon)} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512"
            >
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

const styles = stylex.create({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 32,
    justifyContent: "center",
    minHeight: {
      default: "90vh",
      "@supports (height: 100dvh)": "90dvh",
    },
    paddingBlock: spacing.sm,
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 200,
    margin: 0,
  },
  logo: {
    maxWidth: 800,
    transform: "translateX(1.5%)",
    width: "calc(100% - 32px)",
  },
  nav: {
    display: "flex",
    gap: spacing.xl,
    flexDirection: {
      default: "column",
      "@media (min-width: 640px)": "row",
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
  },
  footer: {
    marginTop: 'auto',
    padding: spacing.md,
    textAlign: 'center',
    width: '100%',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.md,
  },
  footerLink: {
    color: 'light-dark(crimson, cornflowerblue)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    ':hover': {
      color: 'color-mix(in oklch, light-dark(crimson, cornflowerblue), transparent 30%)',
    },
  },
  footerText: {
    fontSize: '0.9rem',
  },
  icon: {
    width: '1.5em',
    height: '1.5em',
    fill: 'currentColor',
  },
});
