import { Feed } from "feed";

export async function GET() {
  const feed = new Feed({
    title: "JC's Blog",
    id: "https://your-domain.com/",
    link: "https://your-domain.com/",
    updated: new Date(),
    author: {
      name: "JC",
      link: "https://your-domain.com/",
    },
  });

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
