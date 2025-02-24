import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    console.log('Fetching suggestions for:', query);
    const response = await fetch(
      `http://suggestqueries.google.com/complete/search?output=firefox&q=${encodeURIComponent(query)}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw response:', data);
    
    // Google's response format is [query, suggestions[]]
    if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
      const suggestions = data[1];
      console.log('Parsed suggestions:', suggestions);
      return NextResponse.json(suggestions);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    return NextResponse.json([]);
  }
}