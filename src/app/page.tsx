import * as stylex from "@stylexjs/stylex";
import Logo from "./Logo";
import { Link } from "next-view-transitions";
import { spacing } from "./vars.stylex";

export default function Home() {
  return (
    <div>
      <header {...stylex.props(styles.header)}>
        <Logo style={styles.logo} collapsible />
        <nav {...stylex.props(styles.nav)}>
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
      </header>
      <main></main>
    </div>
  );
}

const styles = stylex.create({
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
});
