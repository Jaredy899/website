import { Feed } from "feed";

export async function GET() {
  const feed = new Feed({
    title: "Jared Cervantes' Blog",
    id: "https://jaredcervantes.com",
    link: "https://jaredcervantes.com",
    updated: new Date(),
    author: {
      name: "Jared Cervantes",
      link: "https://jaredcervantes.com",
    },
    copyright: "All rights reserved 2025",
  });

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
