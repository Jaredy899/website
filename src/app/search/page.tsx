'use client';
import * as stylex from "@stylexjs/stylex";
import { colors, spacing, text } from "../vars.stylex";
import { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 1) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}&t=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSuggestions(data);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : -1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > -1 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          const form = document.createElement('form');
          form.method = 'get';
          form.action = 'https://search.jaredcervantes.com/search';
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'q';
          input.value = suggestions[selectedIndex];
          form.appendChild(input);
          document.body.appendChild(form);
          form.submit();
        }
        break;
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.h1)}>Search</h1>
      <p {...stylex.props(styles.notice)}>
        This is a private search instance. Response times may vary.
      </p>
      <div {...stylex.props(styles.searchContainer)}>
        <form 
          {...stylex.props(styles.form)} 
          method="get" 
          action="https://search.jaredcervantes.com/search"
        >
          <div {...stylex.props(styles.inputWrapper)}>
            <input
              {...stylex.props(styles.input)}
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              autoFocus
              autoComplete="off"
            />
            {isLoading && <div {...stylex.props(styles.loadingDot)} />}
          </div>
        </form>
        {suggestions.length > 0 && (
          <ul {...stylex.props(styles.suggestions)}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                {...stylex.props(
                  styles.suggestion,
                  index === selectedIndex && styles.selectedSuggestion
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const form = document.createElement('form');
                  form.method = 'get';
                  form.action = 'https://search.jaredcervantes.com/search';
                  const input = document.createElement('input');
                  input.type = 'hidden';
                  input.name = 'q';
                  input.value = suggestion;
                  form.appendChild(input);
                  document.body.appendChild(form);
                  form.submit();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
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

const pulse = stylex.keyframes({
  '0%': { transform: 'scale(0.95)', opacity: 0.5 },
  '50%': { transform: 'scale(1.05)', opacity: 0.8 },
  '100%': { transform: 'scale(0.95)', opacity: 0.5 },
});

const styles = stylex.create({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    position: 'relative',
  },
  h1: {
    textAlign: "center",
    textWrap: "balance" as const,
    marginBottom: spacing.sm,
    fontSize: text.h1,
    fontWeight: 600,
    marginTop: spacing.xl,
  },
  notice: {
    textAlign: 'center',
    color: 'color-mix(in oklch, ${colors.fg}, transparent 40%)',
    fontSize: '0.9rem',
    marginBottom: spacing.xl,
    maxWidth: '600px',
    margin: '0 auto 24px',
    padding: '0 16px',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '120px', // Add space for the footer
    padding: '0 16px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: spacing.sm,
    fontSize: text.p,
    borderRadius: '8px',
    border: {
      default: `1px solid color-mix(in oklch, ${colors.fg}, transparent 75%)`,
      ':focus': `1px solid ${colors.accent}`,
    },
    backgroundColor: 'transparent',
    color: colors.fg,
    outline: 'none',
  },
  loadingDot: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'light-dark(crimson, cornflowerblue)',
    animation: `${pulse} 1.5s ease-in-out infinite`,
    zIndex: 2000,
  },
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.accent}`,
    borderRadius: '8px',
    marginTop: '4px',
    padding: '8px 0',
    listStyle: 'none',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  suggestion: {
    padding: '8px 16px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colors.accent}, transparent 90%)`,
    },
  },
  selectedSuggestion: {
    backgroundColor: `color-mix(in oklch, ${colors.accent}, transparent 90%)`,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'color-mix(in oklch, ${colors.bg}, transparent 80%)',
    backdropFilter: 'blur(5px)',
    zIndex: 10,
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
  icon: {
    width: '1.5em',
    height: '1.5em',
    fill: 'currentColor',
  },
});
