'use client';
import * as stylex from "@stylexjs/stylex";
import { colors, spacing, text } from "../vars.stylex";
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Import bangs array and define Bang interface
import { bangs } from './bang';

// Define the Bang interface based on how it's used in the code
interface Bang {
  t: string;  // Bang type/shortcut (e.g., 'g', 'yt')
  s: string;  // Bang service name
  u: string;  // URL template with {{{s}}} placeholder
}

// Main component that uses useSearchParams
function BangContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [defaultBang, setDefaultBang] = useState('g');
  const [saveStatus, setSaveStatus] = useState({ message: '', isError: false, visible: false });
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if we need to handle a query (in case middleware didn't catch it)
  useEffect(() => {
    const query = searchParams.get('q')?.trim();
    if (query) {
      const match = query.match(/!(\S+)/i);
      const bangCandidate = match?.[1]?.toLowerCase();
      
      // Get the stored default bang
      let storedDefaultBang = 'g';
      if (typeof localStorage !== 'undefined') {
        storedDefaultBang = localStorage.getItem('default-bang') || 'g';
      }
      
      const selectedBang = bangs.find((b: Bang) => b.t === bangCandidate) || 
                           bangs.find((b: Bang) => b.t === storedDefaultBang);
      
      if (selectedBang) {
        // Remove the first bang from the query
        const cleanQuery = query.replace(/!\S+\s*/i, '').trim();
        
        // Format of the url is: https://www.google.com/search?q={{{s}}}
        const searchUrl = selectedBang.u.replace(
          '{{{s}}}',
          // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
          encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
        );
        
        // Redirect immediately
        window.location.replace(searchUrl);
      }
    }
  }, [searchParams]);
  
  // Load default bang from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDefaultBang = localStorage.getItem('default-bang');
      if (storedDefaultBang) {
        setDefaultBang(storedDefaultBang);
      }
    }
  }, []);
  
  const validateAndSaveBang = () => {
    const inputValue = defaultBang.trim();
    // Remove ! from start or end of input
    const cleanBang = inputValue.replace(/^!|!$/g, '');
    
    const selectedBang = bangs.find((b: Bang) => b.t === cleanBang);
    
    if (!selectedBang) {
      setSaveStatus({
        message: `Bang "!${cleanBang}" doesn't exist`,
        isError: true,
        visible: true
      });
      return;
    }
    
    // Save to localStorage for client-side use
    localStorage.setItem('default-bang', cleanBang);
    
    // Also save as a cookie for server-side use (route handler)
    document.cookie = `default-bang=${cleanBang}; path=/; max-age=31536000; SameSite=Strict`;
    
    setSaveStatus({
      message: `Using !${cleanBang} (${selectedBang.s}) as default bang`,
      isError: false,
      visible: true
    });
    
    setIsSaved(true);
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, visible: false }));
      setIsSaved(false);
    }, 2000);
  };
  
  const copyToClipboard = async () => {
    const url = `${window.location.origin}/bang?q=%s`;
    await navigator.clipboard.writeText(url);
    
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.contentContainer)}>
        <h1 {...stylex.props(styles.h1)}>Jared's Bang Search</h1>
        <p {...stylex.props(styles.description)}>
          DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. 
          Enables <a 
            href="https://duckduckgo.com/bang.html" 
            target="_blank" 
            rel="noopener noreferrer"
            {...stylex.props(styles.link)}
          >
            all of DuckDuckGo's bangs.
          </a>
        </p>
        
        <div {...stylex.props(styles.urlContainer)}>
          <input
            type="text"
            {...stylex.props(styles.urlInput)}
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/bang?q=%s`}
            readOnly
          />
          <button 
            {...stylex.props(styles.copyButton)}
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
          >
            <div {...stylex.props(styles.iconContainer)}>
              {isCopied ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M9 14l2 2 4-4"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              )}
            </div>
          </button>
        </div>
        
        <div {...stylex.props(styles.defaultBangContainer)}>
          <label {...stylex.props(styles.label)} htmlFor="default-bang">
            Default Bang (when no bang is specified):
          </label>
          <div {...stylex.props(styles.inputRow)}>
            <div {...stylex.props(styles.inputWrapper)}>
              <input
                type="text"
                id="default-bang"
                {...stylex.props(
                  styles.defaultBangInput,
                  saveStatus.isError && saveStatus.visible && styles.inputError
                )}
                value={defaultBang}
                onChange={(e) => setDefaultBang(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') validateAndSaveBang();
                }}
                placeholder="Enter bang (e.g. g, gi, yt, w)"
              />
              <div 
                {...stylex.props(
                  styles.bangSaveStatus,
                  saveStatus.visible && styles.statusVisible,
                  saveStatus.isError ? styles.statusError : styles.statusSuccess
                )}
              >
                {saveStatus.message}
              </div>
            </div>
            <button
              {...stylex.props(styles.saveButton)}
              onClick={validateAndSaveBang}
              aria-label="Save default bang"
            >
              <div {...stylex.props(styles.iconContainer)}>
                {isSaved ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <footer {...stylex.props(styles.footer)}>
        <a 
          href="https://t3.chat" 
          target="_blank" 
          rel="noopener noreferrer"
          {...stylex.props(styles.footerLink)}
        >
          t3.chat
        </a>
        <span {...stylex.props(styles.footerDivider)}>•</span>
        <a 
          href="https://github.com/jaredy899" 
          target="_blank" 
          rel="noopener noreferrer"
          {...stylex.props(styles.footerLink)}
        >
          github
        </a>
      </footer>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div {...stylex.props(styles.container, styles.loadingContainer)}>
      <div>Loading...</div>
    </div>
  );
}

// Export the page component with Suspense boundary
export default function BangPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BangContent />
    </Suspense>
  );
}

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 'calc(100vh - 120px)', // Reduced from 200px
    padding: spacing.xs,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  contentContainer: {
    maxWidth: '600px',
    width: '100%',
    padding: spacing.md,
    borderRadius: '8px',
    backgroundColor: 'color-mix(in oklch, ${colors.bg}, transparent 50%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  h1: {
    textAlign: 'center',
    fontSize: {
      default: text.h2,
      "@media (max-width: 600px)": text.h3,
    },
    fontWeight: 600,
    marginBottom: spacing.xs,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 1.4,
    fontSize: {
      default: '0.95rem',
      "@media (max-width: 600px)": '0.85rem',
    },
  },
  link: {
    color: colors.accent,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  urlContainer: {
    display: 'flex',
    marginBottom: spacing.sm,
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px solid color-mix(in oklch, ${colors.fg}, transparent 75%)`,
  },
  urlInput: {
    flexGrow: 1,
    padding: `${spacing.xs} ${spacing.sm}`,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.fg,
    fontSize: '0.9rem',
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    backgroundColor: 'transparent',
    border: 'none',
    borderLeft: `1px solid color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: 'color-mix(in oklch, ${colors.fg}, transparent 95%)',
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.fg,
  },
  defaultBangContainer: {
    marginBottom: spacing.sm,
  },
  label: {
    display: 'block',
    marginBottom: spacing.xs,
    fontSize: '0.9rem',
  },
  inputRow: {
    display: 'flex',
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flexGrow: 1,
    position: 'relative',
  },
  defaultBangInput: {
    width: '100%',
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: '4px',
    border: `1px solid color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    backgroundColor: 'transparent',
    color: colors.fg,
    transition: 'border-color 0.2s ease',
    fontSize: '0.9rem',
  },
  inputError: {
    borderColor: 'light-dark(#dc3545, #ff6b6b)',
  },
  bangSaveStatus: {
    marginTop: '4px',
    fontSize: '0.8rem',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  statusVisible: {
    opacity: 1,
  },
  statusError: {
    color: 'light-dark(#dc3545, #ff6b6b)',
  },
  statusSuccess: {
    color: 'light-dark(#28a745, #51cf66)',
  },
  saveButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    backgroundColor: 'transparent',
    border: `1px solid color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: 'color-mix(in oklch, ${colors.fg}, transparent 95%)',
    },
  },
  footer: {
    marginTop: spacing.sm,
    padding: spacing.xs,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: '0.85rem',
  },
  footerLink: {
    color: colors.accent,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  footerDivider: {
    color: 'color-mix(in oklch, ${colors.fg}, transparent 40%)',
  },
});