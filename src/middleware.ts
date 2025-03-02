import { NextRequest, NextResponse } from 'next/server';
import { bangs } from './app/unduck/bang';

// Define the Bang interface based on how it's used in the code
interface Bang {
  t: string;  // Bang type/shortcut (e.g., 'g', 'yt')
  s: string;  // Bang service name
  u: string;  // URL template with {{{s}}} placeholder
}

export function middleware(request: NextRequest) {
  // Only run this middleware for the /unduck path with a query parameter
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/unduck')) {
    return NextResponse.next();
  }
  
  // Get the query parameter
  const query = url.searchParams.get('q')?.trim();
  
  // If no query, let the page component render
  if (!query) {
    return NextResponse.next();
  }
  
  // Get the redirect URL
  const match = query.match(/!(\S+)/i);
  const bangCandidate = match?.[1]?.toLowerCase();
  
  // Try to get the user's default bang from cookies
  const defaultBangCookie = request.cookies.get('default-bang');
  const defaultBang = defaultBangCookie?.value || 'g';
  
  // If a bang is specified in the query, use that, otherwise use the default
  const bangToUse = bangCandidate || defaultBang;
  
  const selectedBang = bangs.find((b: Bang) => b.t === bangToUse);
  
  if (!selectedBang) {
    // Fallback to Google if the specified bang doesn't exist
    const googleBang = bangs.find((b: Bang) => b.t === 'g');
    if (!googleBang) {
      return NextResponse.next();
    }
    
    // Clean the query (remove bang if present)
    const cleanQuery = bangCandidate ? query.replace(/!\S+\s*/i, '').trim() : query;
    
    const searchUrl = googleBang.u.replace(
      '{{{s}}}',
      encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
    );
    
    return NextResponse.redirect(searchUrl);
  }
  
  // Remove the first bang from the query if present
  const cleanQuery = bangCandidate ? query.replace(/!\S+\s*/i, '').trim() : query;
  
  // Format of the url is: https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang.u.replace(
    '{{{s}}}',
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
  );
  
  // Redirect to the search URL
  return NextResponse.redirect(searchUrl);
}

// Configure the middleware to run only on the /unduck path
export const config = {
  matcher: ['/unduck']
}; 