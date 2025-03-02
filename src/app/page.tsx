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
          <a
            href="https://github.com/Jaredy899"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.footerLink)}
            aria-label="GitHub Profile"
          >
            <svg 
              {...stylex.props(styles.icon)} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

const styles = stylex.create({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    justifyContent: "center",
    height: "70vh",
    paddingBlock: spacing.sm,
    marginTop: spacing.xl,
    width: "100%",
    textAlign: "center",
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 200,
    margin: 0,
  },
  logo: {
    maxWidth: {
      default: 500,
      "@media (max-width: 600px)": 350,
    },
    transform: "translateX(0)",
    width: "calc(100% - 32px)",
    margin: "0 auto",
  },
  nav: {
    display: "flex",
    gap: {
      default: spacing.md,
      "@media (min-width: 640px)": spacing.lg,
    },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    width: "100%",
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
  footer: {
    marginTop: 'auto',
    padding: spacing.md,
    textAlign: 'center',
    width: '100%',
  },
  socialLinks: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    display: 'flex',
    gap: spacing.xl,
    justifyContent: 'center',
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
