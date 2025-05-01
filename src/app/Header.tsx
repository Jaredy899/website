"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import styles from "./Header.module.css";
import { useTheme } from "./ThemeControl";
import Logo from "./Logo";

export default function Header() {
  const theme = useTheme();
  const iconColor = theme === "light" ? "#171717" : "#ededed";

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.homeButton}>
        <Logo />
      </Link>
      <div className={styles.socialLinks}>
        <a
          href="https://github.com/Jaredy899"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <Github size={24} stroke={iconColor} />
        </a>
        <a
          href="https://twitter.com/Jaredy899"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <Twitter size={24} stroke={iconColor} />
        </a>
      </div>
    </header>
  );
} 