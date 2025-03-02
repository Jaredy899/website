'use client';
import * as stylex from "@stylexjs/stylex";
import { colors, spacing, text, fonts } from "../vars.stylex";
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
  const [defaultBang, setDefaultBang] = useState('jc');
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
      let storedDefaultBang = 'jc';
      if (typeof localStorage !== 'undefined') {
        storedDefaultBang = localStorage.getItem('default-bang') || 'jc';
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
    try {
      await navigator.clipboard.writeText(url);
      
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };
  
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.contentContainer)}>
        <h1 {...stylex.props(styles.h1)}>Jared's Bang Search</h1>
        <p {...stylex.props(styles.description)}>
          Add the following URL as a custom search engine to your browser.
          <br />
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
          <div {...stylex.props(styles.urlContainer)}>
            <input
              type="text"
              id="default-bang"
              {...stylex.props(styles.urlInput)}
              value={defaultBang}
              onChange={(e) => setDefaultBang(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') validateAndSaveBang();
              }}
              placeholder="Enter bang (e.g. g, gi, yt, w)"
            />
            <button
              {...stylex.props(styles.copyButton)}
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
          
          <div 
            {...stylex.props(
              styles.bangSaveStatus,
              saveStatus.visible && styles.statusVisible,
              saveStatus.isError ? styles.statusError : styles.statusSuccess
            )}
          >
            {saveStatus.message}
          </div>
          
          <div {...stylex.props(styles.bangInfoContainer)}>
            <p {...stylex.props(styles.bangInfoText)}>
              <span {...stylex.props(styles.bangCode)}>g</span> - Google Search &nbsp;|&nbsp; <span {...stylex.props(styles.bangCode)}>jc</span> - Jared's private search
            </p>
          </div>
        </div>
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
    height: '100vh',
    padding: 0,
    position: 'relative',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  contentContainer: {
    maxWidth: '600px',
    width: '100%',
    padding: spacing.sm,
    borderRadius: '8px',
    backgroundColor: 'color-mix(in oklch, ${colors.bg}, transparent 50%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: spacing.xs,
    marginBottom: '120px',
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
  bangInfoContainer: {
    marginTop: spacing.md,
    fontSize: '0.85rem',
    textAlign: 'center',
    width: '100%',
  },
  bangInfoText: {
    marginBottom: spacing.xs,
  },
  bangCode: {
    fontFamily: fonts.mono,
    backgroundColor: 'color-mix(in oklch, ${colors.fg}, transparent 90%)',
    padding: '2px 4px',
    borderRadius: '3px',
    fontWeight: 600,
  },
});