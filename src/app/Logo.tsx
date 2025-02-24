import * as stylex from "@stylexjs/stylex";
import { vars } from "./logoVars.stylex";
import { colors } from "./vars.stylex";

type Props = {
  collapsible?: boolean;
  style?: stylex.StyleXStyles;
};

export default function Logo({ collapsible = false, style }: Props) {
  return (
    <svg
      {...stylex.props(styles.container, collapsible && styles.collapse, style)}
      viewBox="0 0 600 419"
    >
      <g {...stylex.props(styles.letter, collapsible && styles.outerScale)}>
        <path
          {...stylex.props(styles.letter, styles.j)}
          aria-label="J"
          d="M285 0V334.421L150.264679 416.503L150 416.396V334.421L240 280V0H285Z"
        />
        
        <path
          {...stylex.props(styles.letter, styles.c)}
          aria-label="C"
          d="M300 82.7372C300 37.0217 337.027 0 382.75 0H525V45H382.75C361.988 45 345.006 61.9759 345.006 82.7372V334.06C345.006 354.821 361.988 371.797 382.75 371.797H525V416.797H382.75C337.027 416.797 300 379.775 300 334.06V82.7372Z"
        />
      </g>
    </svg>
  );
}

const styles = stylex.create({
  container: {
    aspectRatio: 600 / 419,
    containerType: "inline-size",
    [vars.collapsed]: 0,
    fill: colors.fg,
    // eslint-disable-next-line @stylexjs/valid-styles
    viewTransitionName: "logo",
  },
  collapse: {
    [vars.collapsed]: {
      default: 0,
      ":hover": 1,
    },
  },
  outerScale: {
    scale: `calc(0.75 + ${vars.collapsed} * 0.25)`,
    transformOrigin: "center",
    transitionProperty: "scale",
  },
  letter: {
    transitionDuration: "0.15s",
    transitionProperty: "transform",
    transitionTimingFunction: "ease-out",
  },
  j: {
    transform: `translateX(calc(${vars.collapsed} * -5cqi))`,
  },
  c: {
    transform: `translateX(calc(${vars.collapsed} * 5cqi))`,
  },
});
