import { Feed } from "feed";
import { getBlogPosts } from "./getPosts";
import { unstable_cache } from "next/cache";

export const getFeed = unstable_cache(async function getFeed() {
  const siteURL = "https://jaredcervantes.com";
  const feedOptions = {
    title: "jaredcervantes.com",
    language: "en",
    id: siteURL,
    link: siteURL,
    description: "Jared Cervantes's blog",
    // image: `${siteURL}/og.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Jared Cervantes`,
    author: {
      name: "Jared Cervantes",
      link: `${siteURL}/blog`,
    },
  };
  const feed = new Feed(feedOptions);
  try {
    const posts = await getBlogPosts();

    posts.forEach((post) => {
      const { title, path, description = "", date = "" } = post;

      if (title == null || path == null) {
        return;
      }

      feed.addItem({
        title,
        id: path,
        link: `${siteURL}${path}`,
        description,
        content: description,
        date: new Date(date),
        author: [feedOptions.author],
      });
    });

    return feed;
  } catch (error) {
    console.error(error);
    return feed;
  }
});
