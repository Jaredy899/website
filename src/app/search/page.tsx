'use client';
import * as stylex from "@stylexjs/stylex";
import { colors, spacing, text } from "../vars.stylex";
import { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 1) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}&t=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSuggestions(data);
        setSelectedIndex(-1); // Reset selection when new suggestions arrive
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
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
    <div>
      <h1 {...stylex.props(styles.h1)}>Search</h1>
      <div {...stylex.props(styles.searchContainer)}>
        <form 
          {...stylex.props(styles.form)} 
          method="get" 
          action="https://search.jaredcervantes.com/search"
        >
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
    </div>
  );
}

const styles = stylex.create({
  h1: {
    textAlign: "center",
    textWrap: "balance" as const,
    marginBottom: spacing.xl,
    fontSize: text.h1,
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
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
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
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
});
